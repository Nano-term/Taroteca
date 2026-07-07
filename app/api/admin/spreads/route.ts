import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin";
import { getServiceSupabase } from "@/lib/supabase-server";

export async function POST(request: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  let body: Record<string, unknown> = {};
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  }

  const title = typeof body.title === "string" ? body.title.trim() : "";
  const question = typeof body.question === "string" ? body.question.trim() : "";
  const context = typeof body.context === "string" ? body.context.trim() : "";
  const cards = Array.isArray(body.cards) ? body.cards : [];
  const spreadType = typeof body.spread_type === "string" ? body.spread_type : "three-cards";
  const spreadDate = typeof body.spread_date === "string" ? body.spread_date : new Date().toISOString().split("T")[0];

  if (!title || !question || !context || cards.length === 0) {
    return NextResponse.json({ error: "Faltan datos requeridos" }, { status: 400 });
  }

  const supabase = getServiceSupabase();
  if (!supabase) {
    return NextResponse.json(
      { error: "Supabase no está configurado" },
      { status: 500 }
    );
  }

  const { data, error } = await supabase
    .from("daily_spreads")
    .insert({ title, question, context, cards, spread_date: spreadDate, spread_type: spreadType })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ spread: data });
}
