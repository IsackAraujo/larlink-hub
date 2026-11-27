import { createClient } from "@/lib/supabase/server";
import { NextResponse, type NextRequest } from "next/server";

/** Destino do link mágico do e-mail: troca o código pela sessão e manda para a home do papel. */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(`${origin}/`);
  }

  return NextResponse.redirect(`${origin}/login?erro=link-invalido`);
}
