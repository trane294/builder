import express, { Request, Response, Router, NextFunction } from "express";
import {
    registerUser,
    loginUser,
    getUserProfile,
} from "../controllers/userController";
import authMiddleware, {
    AuthenticatedRequest,
} from "../middleware/authMiddleware";

const router: Router = express.Router();

router.post("/register", (req: Request, res: Response, next: NextFunction) => {
    registerUser(req, res).catch(next);
});
router.post("/login", (req: Request, res: Response, next: NextFunction) => {
    loginUser(req, res).catch(next);
});
router.get(
    "/profile",
    authMiddleware,
    (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        getUserProfile(req, res).catch(next);
    }
);

export default router;
