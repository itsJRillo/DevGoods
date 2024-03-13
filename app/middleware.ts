import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type {NextRequest} from "next/server";

export async function middleware(req: NextRequest) {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req, res })
  
    const { data: { user } } = await supabase.auth.getUser()
  
    if (!user) {
      return NextResponse.redirect(new URL('/account/login', req.url))
    }
  
    return res
  }

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"]
}