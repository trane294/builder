import { Request, Response } from "express";
import {
    SubscriptionService,
    SubscriptionPlan,
} from "../subscription/SubscriptionService";
import {
    getUserById,
    updateUserSubscription,
} from "../repositories/userRepository";
import { ISubscription } from "../types";
import { AuthenticatedRequest } from "../middleware/authMiddleware";

const subscriptionService = new SubscriptionService();

/**
 * @swagger
 * /api/subscription/subscribe:
 *   post:
 *     summary: Subscribe to a plan
 *     tags: [Subscription]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - plan
 *             properties:
 *               plan:
 *                 type: string
 *                 enum: [free, pro, power]
 *     responses:
 *       200:
 *         description: Subscription created successfully
 *       400:
 *         description: Invalid plan
 *       500:
 *         description: Server error
 */
export const subscribe = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.userId;
        const { plan } = req.body;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!plan || !Object.values(SubscriptionPlan).includes(plan)) {
            return res
                .status(400)
                .json({ message: "Invalid subscription plan" });
        }

        const subscription = await subscriptionService.subscribe(userId, plan);

        // Update user's subscription in database
        await updateUserSubscription(userId, subscription);

        return res.status(200).json({ subscription });
    } catch (error) {
        console.error("Subscribe error:", error);
        return res
            .status(500)
            .json({ message: "Failed to create subscription" });
    }
};

/**
 * @swagger
 * /api/subscription/cancel:
 *   post:
 *     summary: Cancel current subscription
 *     tags: [Subscription]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Subscription cancelled successfully
 *       500:
 *         description: Server error
 */
export const cancelSubscription = async (
    req: AuthenticatedRequest,
    res: Response
) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const user = await getUserById(userId);
        if (!user || !user.subscription) {
            return res
                .status(400)
                .json({ message: "No active subscription found" });
        }

        // In a real implementation, you would store the subscription ID in the user record
        const subscriptionId = `sub_${userId}`;
        await subscriptionService.cancelSubscription(subscriptionId);

        // Downgrade to free plan
        const freeSubscription: ISubscription = {
            permissions: {
                canCreate: true,
                canPublish: false,
            },
            publishLimit: 0,
            plan: SubscriptionPlan.FREE,
        };

        await updateUserSubscription(userId, freeSubscription);

        return res
            .status(200)
            .json({ message: "Subscription cancelled successfully" });
    } catch (error) {
        console.error("Cancel subscription error:", error);
        return res
            .status(500)
            .json({ message: "Failed to cancel subscription" });
    }
};

/**
 * @swagger
 * /api/subscription/upgrade:
 *   post:
 *     summary: Upgrade subscription to a different plan
 *     tags: [Subscription]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - plan
 *             properties:
 *               plan:
 *                 type: string
 *                 enum: [pro, power]
 *     responses:
 *       200:
 *         description: Subscription upgraded successfully
 *       400:
 *         description: Invalid plan
 *       500:
 *         description: Server error
 */
export const upgradePlan = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.userId;
        const { plan } = req.body;

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!plan || !Object.values(SubscriptionPlan).includes(plan)) {
            return res
                .status(400)
                .json({ message: "Invalid subscription plan" });
        }

        // In a real implementation, you would fetch the subscription ID from your database
        const subscriptionId = `sub_${userId}`;
        const subscription = await subscriptionService.upgradePlan(
            userId,
            subscriptionId,
            plan
        );

        // Update user's subscription in database
        await updateUserSubscription(userId, subscription);

        return res.status(200).json({ subscription });
    } catch (error) {
        console.error("Upgrade plan error:", error);
        return res
            .status(500)
            .json({ message: "Failed to upgrade subscription" });
    }
};
