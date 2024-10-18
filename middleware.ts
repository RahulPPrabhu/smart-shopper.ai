import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const protectedRoutes = ['/api/GenAI', '/api/Cart'];

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth/sign-in', req.url));
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret) as any;
      
      console.log('Decoded token payload:', payload);

      const requestHeaders = new Headers(req.headers);
      requestHeaders.set('uid', payload?.uid);

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error) {
      console.error('Invalid token:', error);
      return NextResponse.redirect(new URL('/auth/sign-in', req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/GenAI/:path*', '/api/Cart/:path*'],
};