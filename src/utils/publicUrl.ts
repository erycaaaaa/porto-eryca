export function publicUrl(path = "") {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return `${base}${path}`.replace(/\/+$/, "").replace(/\/{2,}/g, "/");
}
