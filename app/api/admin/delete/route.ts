import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin";
import { getServiceSupabase } from "@/lib/supabase-server";

const DELETABLE_TABLES = new Set([
  "card_comments",
  "daily_spread_comments",
  "suggestions",
  "spells",
]);

export async function POST(request: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  let table = "";
  let id = "";
  try {
    const body = await request.json();
    table = typeof body?.table === "string" ? body.table : "";
    id = typeof body?.id === "string" ? body.id : "";
  } catch {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  }

  if (!DELETABLE_TABLES.has(table) || !id) {
    return NextResponse.json({ error: "Tabla o id no válidos" }, { status: 400 });
  }

  const supabase = getServiceSupabase();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase no está configurado (SUPABASE_SERVICE_ROLE_KEY)" },
      { status: 500 }
    );
  }

  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
