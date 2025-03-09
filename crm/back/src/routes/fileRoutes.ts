import express, { Router, NextFunction, Response } from "express";
import { uploadFile } from "../controllers/filesController";
import authMiddleware, {
    AuthenticatedRequestWithFile,
} from "../middleware/authMiddleware";
import upload from "../controllers/filesController";

const router: Router = express.Router();

// Apply the upload middleware
router.post(
    "/",
    authMiddleware,
    upload.single("file"),
    (req: AuthenticatedRequestWithFile, res: Response, next: NextFunction) => {
        uploadFile(req, res, next);
    }
);

export default router;
