// src/utils/prefix.ts
export function prefix(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const p = path.startsWith("http")
    ? path
    : path.startsWith("/")
    ? path
    : `/${path}`;
  return `${base}${p}`;
}
