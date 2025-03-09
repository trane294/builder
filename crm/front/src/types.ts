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
    data?: object | null;
};

export type IWebsite = ICreateWebsite & {
    id: number;
    template: ITemplate;
    user: IUser;
    data: object;
    metadata: {
        title: string;
        description: string;
        ogImage: string;
    };
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
};