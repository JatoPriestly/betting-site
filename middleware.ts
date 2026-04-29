import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ['en', 'fr', 'es'];
const defaultLocale = 'en';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Only redirect the root path to the default locale
  if (pathname === '/') {
    request.nextUrl.pathname = `/${defaultLocale}`;
    return NextResponse.redirect(request.nextUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Only match the root path
    '/',
  ],
}
