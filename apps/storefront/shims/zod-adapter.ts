export function fallback<T>(schema: T) {
  return schema;
}

export function zodValidator(_schema: unknown) {
  return (search: unknown) => search;
}
