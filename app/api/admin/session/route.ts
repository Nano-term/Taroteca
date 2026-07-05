import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin";

export async function GET() {
  const isAdmin = await isAdminRequest();
  return NextResponse.json({ isAdmin });
}
