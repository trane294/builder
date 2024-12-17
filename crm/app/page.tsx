'use client';

import React from 'react';
import useSession from './hooks/use-session';
import { defaultSession } from './hooks/lib';

export default function Home() {
    const { session, isLoading, increment } = useSession();

    if (isLoading) {
        return <p className="text-lg">Loading...</p>;
    }

    if (session.isLoggedIn) {
        return (
            <>
                <p className="text-lg">
                    Logged in user: <strong>{session.username}</strong>
                    &nbsp;
                    <button
                        onClick={() => {
                            increment(null, {
                                optimisticData: {
                                    ...session,
                                    counter: session.counter + 1,
                                },
                                revalidate: false,
                            });
                        }}
                    >
                        {session.counter}
                    </button>
                </p>
                <LogoutButton />
            </>
        );
    }

    return <LoginForm />;
}

function LoginForm() {
    const { login } = useSession();

    return (
        <form
            onSubmit={function (event) {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const username = formData.get("username") as string;
                login(username, {
                    optimisticData: {
                        isLoggedIn: true,
                        username,
                        counter: 0,
                    },
                });
            }}
            method="POST"
        >
            <label className="block text-lg">
                <span>Username</span>
                <input
                    type="text"
                    name="username"
                    placeholder=""
                    defaultValue="Alison"
                    required
                    // for demo purposes, disabling autocomplete 1password here
                    autoComplete="off"
                    data-1p-ignore
                />
            </label>
            <div>
                <input type="submit" value="Login" />
            </div>
        </form>
    );
}

function LogoutButton() {
    const { logout } = useSession();

    return (
        <p>
            <a
                onClick={(event) => {
                    event.preventDefault();
                    logout(null, {
                        optimisticData: defaultSession,
                    });
                }}
            >
                Logout
            </a>
        </p>
    );
}