import { ISubscription, IUser } from "../types";
import { PrismaClient } from "@prisma/client";
import { User } from "@prisma/client";

const prisma = new PrismaClient();

export const getUserById = async (userId: number): Promise<User | null> => {
    return prisma.user.findUnique({
        where: { id: userId },
        include: {
            websites: true,
        },
    });
};

export const updateUserSubscription = async (
    userId: number,
    subscription: ISubscription
): Promise<void> => {
    await prisma.user.update({
        where: { id: userId },
        data: {
            subscription: {
                permissions: subscription.permissions,
                publishLimit: subscription.publishLimit,
                expiresAt: subscription.expiresAt,
                plan: subscription.plan,
            },
        },
    });
};
