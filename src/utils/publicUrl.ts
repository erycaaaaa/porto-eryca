// src/utils/publicUrl.ts
export function publicUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  // pastikan path selalu diawali slash
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}
