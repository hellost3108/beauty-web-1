import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isSupabaseConfigured, supabasePublishableKey, supabaseUrl } from "@/lib/supabase/config";

const publicAdminRoutes = ["/admin/login", "/admin/setup"];

export async function updateSession(request: NextRequest) {
  if (!isSupabaseConfigured) {
    return NextResponse.next({ request });
  }

  let response = NextResponse.next({ request });
  const supabase = createServerClient(supabaseUrl, supabasePublishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headersToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
        Object.entries(headersToSet).forEach(([key, value]) => {
          response.headers.set(key, value);
        });
      },
    },
  });

  // This call also refreshes the session cookies (via setAll above) for every
  // matched route, so server components anywhere on the site (Navbar, Account,
  // Checkout) can read up-to-date auth state. Only /admin/:path* enforces a
  // redirect here — the public site handles its own login prompts per page.
  const { data } = await supabase.auth.getClaims();
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/admin")) {
    const isPublicAdminRoute = publicAdminRoutes.some((route) => pathname.startsWith(route));
    if (!data?.claims && !isPublicAdminRoute) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      loginUrl.searchParams.set("next", pathname);
      const redirectResponse = NextResponse.redirect(loginUrl);
      response.cookies.getAll().forEach((cookie) => redirectResponse.cookies.set(cookie));
      return redirectResponse;
    }
  }

  return response;
}
