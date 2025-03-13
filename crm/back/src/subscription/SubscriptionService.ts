import { ISubscription, IPaymentProvider } from '../types';
import { StripeProvider } from './StripeProvider';

export enum SubscriptionPlan {
    FREE = 'free',
    PRO = 'pro',
    POWER = 'power'
}

interface PlanDetails {
    publishLimit: number;
    canCreate: boolean;
    canPublish: boolean;
    stripePlanId?: string;
}

export class SubscriptionService {
    private paymentProvider: IPaymentProvider;

    private planDetails: Record<SubscriptionPlan, PlanDetails> = {
        [SubscriptionPlan.FREE]: {
            publishLimit: 0,
            canCreate: true,
            canPublish: false
        },
        [SubscriptionPlan.PRO]: {
            publishLimit: 1,
            canCreate: true,
            canPublish: true,
            stripePlanId: 'pro_plan_id'
        },
        [SubscriptionPlan.POWER]: {
            publishLimit: 3,
            canCreate: true,
            canPublish: true,
            stripePlanId: 'power_plan_id'
        }
    };

    constructor(paymentProvider?: IPaymentProvider) {
        this.paymentProvider = paymentProvider || new StripeProvider();
    }

    async subscribe(userId: number, plan: SubscriptionPlan): Promise<ISubscription> {
        if (plan === SubscriptionPlan.FREE) {
            // Free plan doesn't need payment processing
            return this.createSubscriptionObject(plan);
        }

        const planDetails = this.planDetails[plan];
        const subscriptionId = await this.paymentProvider.createSubscription(
            userId,
            planDetails.stripePlanId || '',
        );

        const status = await this.paymentProvider.getSubscriptionStatus(subscriptionId);

        return {
            permissions: {
                canCreate: planDetails.canCreate,
                canPublish: planDetails.canPublish
            },
            publishLimit: planDetails.publishLimit,
            plan: plan,
            expiresAt: status.expiresAt || undefined,
            subscriptionId: subscriptionId,
        };
    }

    async cancelSubscription(subscriptionId: string): Promise<boolean> {
        return this.paymentProvider.cancelSubscription(subscriptionId);
    }

    async upgradePlan(userId: number, subscriptionId: string, newPlan: SubscriptionPlan): Promise<ISubscription> {
        const planDetails = this.planDetails[newPlan];

        await this.paymentProvider.updateSubscription(
            subscriptionId,
            planDetails.stripePlanId || ''
        );

        const status = await this.paymentProvider.getSubscriptionStatus(subscriptionId);

        return {
            permissions: {
                canCreate: planDetails.canCreate,
                canPublish: planDetails.canPublish
            },
            publishLimit: planDetails.publishLimit,
            expiresAt: status.expiresAt || undefined,
            plan: newPlan,
            subscriptionId: subscriptionId,
        };
    }

    private createSubscriptionObject(plan: SubscriptionPlan): ISubscription {
        const planDetails = this.planDetails[plan];
        return {
            permissions: {
                canCreate: planDetails.canCreate,
                canPublish: planDetails.canPublish
            },
            publishLimit: planDetails.publishLimit,
            plan: plan
        };
    }
}