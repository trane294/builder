import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../middleware/authMiddleware";

const prisma = new PrismaClient();

const generateJWT = (
    userId: number,
    firstName: string,
    lastName: string
): string => {
    const jwt = require("jsonwebtoken");
    const token = jwt.sign(
        { userId, firstName, lastName },
        process.env.JWT_SECRET_KEY
    );

    return token;
};

/**
 * @openapi
 * /api/user/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               passwordConfirm:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registration successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registration successful
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: All fields are required or Passwords do not match.
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Some internal server error
 */
export const registerUser = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, password, passwordConfirm } =
            req.body;

        if (
            !firstName ||
            !lastName ||
            !email ||
            !password ||
            !passwordConfirm
        ) {
            res.status(400).json({
                message: "All fields are required.",
            });
            return;
        }
        if (password !== passwordConfirm) {
            res.status(400).json({
                message: "Passwords do not match.",
            });
            return;
        }

        // Hash the password (using bcrypt or similar library)
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user using Prisma
        const newUser = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword,
            },
        });

        // You might want to return a subset of user data in the response
        // to avoid exposing sensitive information like the password hash.
        res.status(201).json({
            message: "User registration successful",
            userId: newUser.id,
        });
        return;
    } catch (error: any) {
        // Handle unique email constraint violation
        if (error.code === "P2002") {
            // Prisma's unique constraint error code
            res.status(400).json({
                message: "Email already in use",
            });
            return;
        }

        console.error("Error registering user:", error);
        res.status(500).json({
            message: "Internal server error",
        });
        return;
    } finally {
        await prisma.$disconnect();
    }
};

/**
 * @openapi
 * /api/user/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 userToken:
 *                   type: string
 *                   example: fake-jwt-token-123
 *                 firstName:
 *                   type: string
 *                   example: FakeUserFirstName
 *                 lastName:
 *                   type: string
 *                   example: FakeUserLastName
 *                 userId:
 *                   type: integer
 *                   example: 1
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid email or password.
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Some internal server error
 */
export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({
                message: "Email and password are required.",
            });
            return;
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            res.status(400).json({ message: "Invalid email or password." });
            return;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            res.status(400).json({ message: "Invalid email or password." });
            return;
        }

        const token = generateJWT(user.id, user.firstName, user.lastName);

        res.json({
            message: "Login successful",
            userToken: token,
            firstName: user.firstName,
            lastName: user.lastName,
            userId: user.id,
        });
        return;
    } catch (error: any) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal server error" });
        return;
    } finally {
        await prisma.$disconnect();
    }
};

/**
 * @openapi
 * /api/user/profile:
 *   get:
 *     summary: Get user profile 1
 *     tags:
 *       - User
 *     responses:
 *       200:
 *         description: User profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 firstName:
 *                   type: string
 *                   example: FakeUserFirstName
 *                 lastName:
 *                   type: string
 *                   example: FakeUserLastName
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Some internal server error
 */
export const getUserProfile = async (
    req: AuthenticatedRequest,
    res: Response
) => {
    try {
        // The userId is now available in req.userId thanks to the middleware!
        const userId = req.userId;

        if (!userId) {
            res.status(401).json({ message: "Unauthorized - Missing user ID" });
            return;
        }

        // Retrieve the user's profile from the database
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
            },
        });

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        // Return the user's profile
        res.status(200).json({
            userId: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        });
    } catch (error: any) {
        console.error("Error getting user profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
