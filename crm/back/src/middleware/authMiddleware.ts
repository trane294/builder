import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
    userId?: number;
}

export interface AuthenticatedRequestWithFile extends AuthenticatedRequest {
    file?: Express.Multer.File;
}

const authMiddleware = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        // Get the token from the Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            res.status(401).json({ message: "Unauthorized - Missing token" });
            return;
        }
        const token = authHeader.split(" ")[1]; // Bearer <token>

        // Verify the token
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET_KEY as string
        ) as { userId: number };

        // Add the userId to the request object
        req.userId = decoded.userId;

        next();
    } catch (error: any) {
        if (error.name === "TokenExpiredError") {
            res.status(401).json({ message: "Unauthorized - Token expired" });
            return;
        } else if (error.name === "JsonWebTokenError") {
            res.status(401).json({ message: "Unauthorized - Invalid token" });
            return;
        }

        console.error("Authentication error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export default authMiddleware;
