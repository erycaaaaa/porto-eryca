// src/utils/prefix.ts

export function prefix(path: string): string {
  let assetPrefix = "";

  if (typeof window === "undefined") {
    // sisi server
    const serverBase = (process.env.__NEXT_ROUTER_BASEPATH as string | undefined) ?? "";
    assetPrefix = serverBase;
  } else {
    const w = window as Window & { __NEXT_DATA__?: { assetPrefix?: string } };
    assetPrefix = w.__NEXT_DATA__?.assetPrefix ?? "";
  }

  return `${assetPrefix}${path}`;
}
