'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn, signOut as authSignOut } from '@/auth';
import { AuthError } from 'next-auth';
import prisma from '@/app/lib/core/prisma';
import bcrypt from 'bcrypt';

const FormSchema = z.object({
    id: z.string(),
    name: z.string().min(4, {
        message: 'Name must be at least 4 characters.',
    }),
    email: z.string().email({
        message: 'Invalid email address.',
    }),
    password: z.string().min(6, {
        message: 'Password must be at least 6 characters.',
    }),
});

const CreateUser = FormSchema.omit({ id: true });

export type SignupState = {
    errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
    };
    message?: string | null;
};

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }

        throw error;
    }
}

export async function signUp(prevState: SignupState, formData: FormData) {
    const validatedFields = CreateUser.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create User.',
        };
    }

    const { name, email, password } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        // await prisma.user.create({
        //     data: {
        //         name,
        //         email,
        //         password: hashedPassword
        //     },
        // });

        // revalidatePath('/signup');
        // router.push('/login');
    } catch (error) {
        // console.log(error.stack);

        return {
            message: 'Failed creating user',
        };
    }
}

export async function signOut() {
    try {
        await authSignOut();
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }

        throw error;
    }
}