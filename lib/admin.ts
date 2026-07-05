import "server-only";
import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "taroteca_admin";
export const ADMIN_SESSION_SECONDS = 60 * 60 * 2; // sesión temporal de 2 horas

function getPassword(): string | null {
  return process.env.ADMIN_PASSWORD || null;
}

/**
 * Token de sesión sin estado: HMAC derivado de ADMIN_PASSWORD.
 * Si la contraseña cambia en el entorno, todas las sesiones caducan.
 */
export function buildAdminToken(): string | null {
  const password = getPassword();
  if (!password) return null;
  return createHmac("sha256", password).update("taroteca-admin-session").digest("hex");
}

export function checkPassword(candidate: string): boolean {
  const password = getPassword();
  if (!password || typeof candidate !== "string") return false;
  const a = Buffer.from(candidate);
  const b = Buffer.from(password);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function isAdminRequest(): Promise<boolean> {
  const expected = buildAdminToken();
  if (!expected) return false;
  const store = await cookies();
  const cookie = store.get(ADMIN_COOKIE)?.value;
  if (!cookie || cookie.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(cookie), Buffer.from(expected));
}
