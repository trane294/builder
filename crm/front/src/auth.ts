let isLoggedIn = false;

export function checkAuth(): boolean {
    return isLoggedIn;
}

export function login(): void {
    isLoggedIn = true;
}

export function logout(): void {
    isLoggedIn = false;
}