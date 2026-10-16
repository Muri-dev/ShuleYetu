import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const demoRole = request.cookies.get('framer_demo_role')?.value;

  // Define public routes that don't require authentication
  const publicPaths = [
    '/',
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
    '/about',
    '/contact',
    '/programs',
    '/admissions',
    '/news',
    '/auth/callback',
    '/api/auth/demo-login',
    '/api/auth/logout',
  ];

  const isPublicPath = publicPaths.some(
    (path) => request.nextUrl.pathname === path || request.nextUrl.pathname.startsWith('/api/public')
  );

  let user = null;

  // If demo role is active, treat as authenticated
  if (demoRole) {
    user = { id: `demo-${demoRole}`, email: `${demoRole}@framerelite.edu` };
  } else {
    // Attempt Supabase session check safely
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('your_supabase_url')) {
        const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
          cookies: {
            getAll() {
              return request.cookies.getAll();
            },
            setAll(cookiesToSet: Array<{ name: string; value: string; options?: any }>) {
              cookiesToSet.forEach(({ name, value }) =>
                request.cookies.set(name, value)
              );
              supabaseResponse = NextResponse.next({
                request,
              });
              cookiesToSet.forEach(({ name, value, options }) =>
                supabaseResponse.cookies.set(name, value, options)
              );
            },
          },
        });

        const { data } = await supabase.auth.getUser();
        user = data.user;
      }
    } catch {
      // Ignore Supabase connection errors in offline/demo mode
      user = null;
    }
  }

  // Redirect unauthenticated users to login for protected portal routes
  if (!user && !isPublicPath && request.nextUrl.pathname.startsWith('/portal')) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    url.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // Redirect authenticated users away from login/register to portal
  if (user && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register')) {
    const url = request.nextUrl.clone();
    url.pathname = '/portal';
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
