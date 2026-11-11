import { handleContact } from "@/lib/contact-handler";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  return handleContact(req);
}

export function GET() {
  return new Response(null, { status: 405, headers: { Allow: "POST" } });
}
