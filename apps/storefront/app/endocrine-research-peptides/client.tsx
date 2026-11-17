"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Route } from "@/views/endocrine-research-peptides";
import { RouteProvider } from "@/shims/router";

export default function Page() {
  const params = useParams() as Record<string, string>;
  const [search, setSearch] = useState<Record<string, string>>({ q: "" });
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    setSearch({ q: sp.get("q") || "", ...Object.fromEntries(sp.entries()) });
  }, []);
  const needsLoader = typeof Route.loader === "function";
  const [data, setData] = useState<unknown>(needsLoader ? undefined : {});
  useEffect(() => {
    let cancelled = false;
    const run = needsLoader ? Route.loader({ params }) : Promise.resolve({});
    Promise.resolve(run)
      .then((value) => { if (!cancelled) setData(value ?? {}); })
      .catch(() => { if (!cancelled) setData({}); });
    return () => { cancelled = true; };
  }, [JSON.stringify(params)]);
  useEffect(() => {
    try {
      const head = Route.head?.({ params, loaderData: data });
      const title = head?.meta?.find((item: { title?: string }) => item.title)?.title;
      if (title) document.title = title;
    } catch {
      /* Some route heads require loader data. The visible page does not. */
    }
  }, [data]);
  if (data === undefined) return <div className="container-x py-20 text-sm text-muted-foreground">Loading…</div>;
  const Screen = Route.component as React.ComponentType;
  return <RouteProvider data={data} search={search} params={params}><Screen /></RouteProvider>;
}
