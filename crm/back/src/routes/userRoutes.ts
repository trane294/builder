import express, { Router } from "express";
import {
    registerUser,
    loginUser,
    getUserProfile,
} from "../controllers/userController";
import authMiddleware from "../middleware/authMiddleware";

const router: Router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getUserProfile);

export default router;
