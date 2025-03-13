export interface ISubscription {
    permissions: {
        canCreate: boolean;
        canPublish: boolean;
    };
    publishLimit: number;
    expiresAt?: string;
    plan: string;
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
    websites: IWebsite[];
    subscription: ISubscription;
}

export interface ITemplate {
    id: number;
    config: string;
    name: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
    Website: IWebsite[];
}

export type ICreateWebsite = {
    name: string;
    description?: string | null;
    templateId: number;
    userId: number;
    data: {
        [key: string]: any;
    };
    metadata: {
        pages: {
            [key: string]: any;
        };
    };
};

export type IWebsite = ICreateWebsite & {
    id: number;
    template: ITemplate;
    user: IUser;
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
};
