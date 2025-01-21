import { redirect } from 'react-router';
import { checkAuth } from '../auth';

export async function protectedLoader() {
    if (!checkAuth()) {
        return redirect('/login');
    }

    return null;
}