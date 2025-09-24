export const dynamic = "force-static";
export const revalidate = false;

export function GET() {
  return Response.json({ ok: true, message: "pong" });
}
