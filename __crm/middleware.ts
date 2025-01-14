import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { authConfig } from './auth.config';

export default NextAuth(authConfig).auth;

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();

    if (req.method === 'GET') {
        // Rewrite routes that match '/[...puckPath]/edit' to '/puck/[...puckPath]'
        if (req.nextUrl.pathname.endsWith('/edit')) {
            const pathWithoutEdit = req.nextUrl.pathname.slice(
                0,
                req.nextUrl.pathname.length - 5
            );
            const pathWithEditPrefix = `/puck${pathWithoutEdit}`;

            return NextResponse.rewrite(new URL(pathWithEditPrefix, req.url));
        }
        // Disable '/puck/[...puckPath]'
        if (req.nextUrl.pathname.startsWith('/puck')) {
            return NextResponse.redirect(new URL('/', req.url));
        }
    }

    return res;
};

export const config = {
    // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};