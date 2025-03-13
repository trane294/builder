import express, { NextFunction, Response } from "express";
import authMiddleware, { AuthenticatedRequest } from "../middleware/authMiddleware";
import {
    subscribe,
    cancelSubscription,
    upgradePlan,
} from "../controllers/subscriptionController";

const router = express.Router();

router.post(
    "/subscribe",
    authMiddleware,
    (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        subscribe(req, res).catch(next);
    }
);
router.post(
    "/cancel",
    authMiddleware,
    (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        cancelSubscription(req, res).catch(next);
    }
);
router.post(
    "/upgrade",
    authMiddleware,
    (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        upgradePlan(req, res).catch(next);
    }
);

export default router;
