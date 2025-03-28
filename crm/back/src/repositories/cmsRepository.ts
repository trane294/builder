import { ISubscription, IUser } from "../types";
import { PrismaClient } from "@prisma/client";
import { Cms } from "@prisma/client";

const prisma = new PrismaClient();

export const createCms = async (type: string, userId: number, wesiteId: number): Promise<Cms> => {
    return await prisma.cms.create({
        data: {
            type,
            userId,
            wesiteId,
        },
    });
};

// export const getUserById = async (userId: number): Promise<User | null> => {
//     return prisma.user.findUnique({
//         where: { id: userId },
//         include: {
//             websites: true,
//         },
//     });
// };

// export const updateUserSubscription = async (
//     userId: number,
//     subscription: ISubscription
// ): Promise<void> => {
//     await prisma.user.update({
//         where: { id: userId },
//         data: {
//             subscription: {
//                 permissions: subscription.permissions,
//                 publishLimit: subscription.publishLimit,
//                 expiresAt: subscription.expiresAt,
//                 plan: subscription.plan,
//             },
//         },
//     });
// };