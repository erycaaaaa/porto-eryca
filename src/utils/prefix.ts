export const prefix = (p: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${p}`;
