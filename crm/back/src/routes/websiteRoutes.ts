import express, { Router, NextFunction } from "express";
import {
    createWebsite,
    updateWebsite,
    deleteWebsite,
    getAllWebsites,
} from "../controllers/websiteController";
import authMiddleware, {
    AuthenticatedRequest,
} from "../middleware/authMiddleware";
import { Response } from "express";

const router: Router = express.Router();

router.get(
    "/",
    authMiddleware,
    (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        getAllWebsites(req, res).catch(next);
    }
);
router.post(
    "/",
    authMiddleware,
    (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        createWebsite(req, res).catch(next);
    }
);
router.put(
    "/:id",
    authMiddleware,
    (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        updateWebsite(req, res).catch(next);
    }
);
router.delete(
    "/:id",
    authMiddleware,
    (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        deleteWebsite(req, res).catch(next);
    }
);

export default router;
