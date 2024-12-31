import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const inApp = nextUrl.pathname.startsWith('/dashboard') || nextUrl.pathname.startsWith('/editor');

            if (inApp) {
                if (isLoggedIn) return true;

                return false;
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }

            return false;
        },
    },
    providers: [

    ],
} satisfies NextAuthConfig;