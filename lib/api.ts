import { ZodError } from "zod";

export async function readJson(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) throw new BadRequestError("Expected JSON request body");
  try { return await request.json(); } catch { throw new BadRequestError("Malformed JSON request body"); }
}

export class BadRequestError extends Error {}

export function validationResponse(error: ZodError) {
  return Response.json({ ok: false, error: "validation_error", message: "Please check the highlighted fields.", fields: error.flatten().fieldErrors }, { status: 422 });
}

export function noStoreJson(data: unknown, init?: ResponseInit) {
  const headers = new Headers(init?.headers); headers.set("Cache-Control", "no-store");
  return Response.json(data, { ...init, headers });
}
