#!/usr/bin/env python3
"""Copy the Lovable storefront into the Next.js app and retarget the router."""
from pathlib import Path
import re
import shutil

ROOT = Path("/workspace")
SRC = ROOT / "src"
DEST = ROOT / "apps" / "storefront"
PUBLIC = ROOT / "public"

COPY_DIRS = ["components", "data", "hooks", "lib", "stores", "assets"]
SKIP_ROUTE_PREFIXES = ("/api", "/lovable", "/email")

def rewrite(text: str) -> str:
    text = text.replace('from "@tanstack/react-router"', 'from "@/shims/router"')
    text = text.replace("from '@tanstack/react-router'", "from '@/shims/router'")
    text = text.replace('from "@tanstack/zod-adapter"', 'from "@/shims/zod-adapter"')
    text = text.replace("?url\"", "\"")
    text = text.replace("?url'", "'")
    return text

def ensure_client(text: str) -> str:
    if text.startswith('"use client"') or text.startswith("'use client'"):
        return text
    return '"use client";\n' + text

DEST.mkdir(parents=True, exist_ok=True)
for name in COPY_DIRS:
    target = DEST / name
    if target.exists():
        shutil.rmtree(target)
    shutil.copytree(SRC / name, target)

views = DEST / "views"
if views.exists():
    shutil.rmtree(views)
views.mkdir()

redirects = []
for path in sorted((SRC / "routes").glob("*.tsx")):
    text = path.read_text()
    match = re.search(r'createFileRoute\(\s*[\'"]([^\'"]+)[\'"]', text)
    if not match:
        continue
    route = match.group(1)
    if route.startswith(SKIP_ROUTE_PREFIXES) or route.endswith(".xml"):
        continue
    if "beforeLoad" in text and "redirect(" in text:
        dest = re.search(r'redirect\(\{\s*to:\s*[\'"]([^\'"]+)[\'"]', text)
        if dest:
            redirects.append((route, dest.group(1)))
        continue
    rewritten = ensure_client(rewrite(text))
    (views / path.name).write_text(rewritten)

for folder in ["components", "hooks", "stores"]:
    for file in (DEST / folder).rglob("*"):
        if file.suffix not in {".ts", ".tsx"}:
            continue
        file.write_text(ensure_client(rewrite(file.read_text())))

for file in (DEST / "lib").rglob("*"):
    if file.suffix not in {".ts", ".tsx"}:
        continue
    file.write_text(rewrite(file.read_text()))

styles = (SRC / "styles.css").read_text()
styles = styles.replace('@source "../src";', '@source "../components";\n@source "../views";\n@source "../app";\n@source "../hooks";\n@source "../lib";')
app_dir = DEST / "app"
app_dir.mkdir(exist_ok=True)
(app_dir / "globals.css").write_text(styles)

# Static files the Lovable app serves from /public.
store_public = DEST / "public"
if store_public.exists():
    shutil.rmtree(store_public)
shutil.copytree(PUBLIC, store_public)
shutil.copy(ROOT / "packages" / "config" / "catalogue.json", DEST / "data" / "catalogue.json")

(DEST / "redirects.json").write_text(__import__("json").dumps([
    {"source": source, "destination": destination, "permanent": True} for source, destination in redirects
], indent=2))
print(f"views {len(list(views.glob('*.tsx')))} redirects {len(redirects)}")
