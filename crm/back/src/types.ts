export interface IPaymentProvider {
    createSubscription(userId: number, planId: string): Promise<string>;
    cancelSubscription(subscriptionId: string): Promise<boolean>;
    updateSubscription(
        subscriptionId: string,
        planId: string
    ): Promise<boolean>;
    getSubscriptionStatus(subscriptionId: string): Promise<{
        active: boolean;
        expiresAt: string | null;
    }>;
}

export interface ISubscription {
    permissions: {
        canCreate: boolean;
        canPublish: boolean;
    };
    publishLimit: number;
    plan: string;
    subscriptionId?: string;
    expiresAt?: string;
}

export interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string | null;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
    websites: object;
    subscription: ISubscription;
}