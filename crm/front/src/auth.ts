let isLoggedIn = false;

export function checkAuth(): boolean {
    return isLoggedIn;
}

export function appLogin(): void {
    isLoggedIn = true;
}

export function appLogout(): void {
    isLoggedIn = false;
}