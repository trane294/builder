import { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { getIronSession } from 'iron-session';
import { defaultSession, sessionOptions } from '../hooks/lib';
import { sleep, SessionData } from '../hooks/lib';

export async function POST(request: NextRequest) {
    const sessionCookies = await cookies();
    const session = await getIronSession<SessionData>(sessionCookies, sessionOptions);

    const { username = 'No username' } = (await request.json()) as {
        username: string;
    };

    session.isLoggedIn = true;
    session.username = username;
    session.counter = 0;
    await session.save();

    // simulate looking up the user in db
    await sleep(250);

    return Response.json(session);
}

export async function PATCH() {
    const sessionCookies = await cookies();
    const session = await getIronSession<SessionData>(sessionCookies, sessionOptions);

    session.counter++;
    session.updateConfig({
        ...sessionOptions,
        cookieOptions: {
            ...sessionOptions.cookieOptions,
            expires: new Date('2024-12-27T00:00:00.000Z'),
            maxAge: undefined,
        },
    });
    await session.save();

    return Response.json(session);
}

export async function GET() {
    const sessionCookies = await cookies();
    const session = await getIronSession<SessionData>(sessionCookies, sessionOptions);

    // simulate looking up the user in db
    await sleep(250);

    if (session.isLoggedIn !== true) {
        return Response.json(defaultSession);
    }

    return Response.json(session);
}

export async function DELETE() {
    const sessionCookies = await cookies();
    const session = await getIronSession<SessionData>(sessionCookies, sessionOptions);

    session.destroy();

    return Response.json(defaultSession);
}