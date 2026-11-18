"use client";

import NextLink from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createContext, useContext, type ReactNode } from "react";

type Params = Record<string, string | number | undefined>;
type Search = Record<string, string | number | undefined>;

const RouteContext = createContext<{ data: unknown; search: Search; params: Params }>({
  data: {},
  search: {},
  params: {},
});

export function RouteProvider({
  data,
  search,
  params,
  children,
}: {
  data: unknown;
  search: Search;
  params: Params;
  children: ReactNode;
}) {
  return <RouteContext.Provider value={{ data, search, params }}>{children}</RouteContext.Provider>;
}

export function resolveHref(to = "/", params?: Params, search?: Search) {
  let path = to;
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      path = path.replaceAll(`$${key}`, encodeURIComponent(String(value ?? "")));
    }
  }
  if (search) {
    const query = new URLSearchParams();
    for (const [key, value] of Object.entries(search)) {
      if (value != null && value !== "") query.set(key, String(value));
    }
    const text = query.toString();
    if (text) return `${path}?${text}`;
  }
  return path;
}

export function Link({
  to,
  href,
  params,
  search,
  className,
  activeProps,
  children,
  preload: _preload,
  ...rest
}: {
  to?: string;
  href?: string;
  params?: Params;
  search?: Search;
  className?: string;
  activeProps?: { className?: string };
  children?: ReactNode;
  preload?: unknown;
  [key: string]: unknown;
}) {
  const pathname = usePathname();
  const url = resolveHref(to || href || "/", params, search);
  const active = pathname === url.split("?")[0];
  const classes = [className, active ? activeProps?.className : ""].filter(Boolean).join(" ");
  return (
    <NextLink href={url} className={classes} {...rest}>
      {children}
    </NextLink>
  );
}

export function useNavigate(options?: { from?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  return (target: string | { to?: string; params?: Params; search?: Search; replace?: boolean }) => {
    if (typeof target === "string") {
      router.push(target);
      return;
    }
    const url = resolveHref(target.to || options?.from || pathname, target.params, target.search);
    if (target.replace) router.replace(url);
    else router.push(url);
  };
}

export function useLocation() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return { pathname, search: Object.fromEntries(searchParams.entries()) };
}

export function createFileRoute(_path: string) {
  return function defineRoute<T extends Record<string, unknown>>(config: T) {
    return {
      ...config,
      useLoaderData: () => useContext(RouteContext).data,
      useSearch: () => useContext(RouteContext).search,
      useParams: () => useContext(RouteContext).params,
    };
  };
}

export function notFound() {
  const error = new Error("Not found");
  (error as Error & { notFound?: boolean }).notFound = true;
  throw error;
}

export function redirect(options: { to: string }) {
  if (typeof window !== "undefined") window.location.replace(options.to);
  throw new Error(`Redirect ${options.to}`);
}

export function Outlet() {
  return null;
}
