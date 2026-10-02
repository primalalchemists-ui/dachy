import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { CRM_HOME_PATH, CRM_LOGIN_PATH } from "@/lib/crm/routes";
import { getSupabasePublishableKey, getSupabaseUrl } from "@/lib/supabase/env";

/**
 * Refreshes the Supabase session cookie and performs optimistic CRM redirects.
 * Data access is still authorized server-side in the CRM queries and actions.
 */
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(getSupabaseUrl(), getSupabasePublishableKey(), {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        Object.entries(headers).forEach(([key, value]) => response.headers.set(key, value));
      },
    },
  });

  const { data } = await supabase.auth.getClaims();
  const isAuthenticated = Boolean(data?.claims);
  const isLoginPage = request.nextUrl.pathname === CRM_LOGIN_PATH;

  if (isAuthenticated === isLoginPage) {
    const redirect = NextResponse.redirect(new URL(isLoginPage ? CRM_HOME_PATH : CRM_LOGIN_PATH, request.url));
    response.cookies.getAll().forEach((cookie) => redirect.cookies.set(cookie));
    return redirect;
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
