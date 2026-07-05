import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin";
import { getServiceSupabase } from "@/lib/supabase-server";

interface Params {
  params: Promise<{ id: string }>;
}

export async function POST(_request: Request, { params }: Params) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const { id } = await params;

  const supabase = getServiceSupabase();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase no está configurado (SUPABASE_SERVICE_ROLE_KEY)" },
      { status: 500 }
    );
  }

  const { error } = await supabase.from("spells").update({ status: "approved" }).eq("id", id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
