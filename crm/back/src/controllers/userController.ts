import { Request, Response } from "express";

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
 *                   example: All fields are required.
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
        const { firstName, email, password, passwordConfirm } = req.body;

        if (!firstName || !email || !password || !passwordConfirm) {
            res.status(400).json({ message: "All fields are required." });
            return;
        }

        if (password !== passwordConfirm) {
            res.status(400).json({ message: "Passwords do not match." });
            return;
        }

        res.status(201).json({ message: "User registration successful" });
        return;
    } catch (error: any) {
        res.status(500).json({ message: error.message });
        return;
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
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email and password are required.
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

        const userToken = "fake-jwt-token-123";
        res.status(200).json({
            userToken,
            message: "Login successful",
            firstName: "FakeUserFirstName",
        });
        return;
    } catch (error: any) {
        res.status(500).json({ message: error.message });
        return;
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
export const getUserProfile = async (req: Request, res: Response) => {
    try {
        res.status(200).json({
            firstName: "FakeUserFirstName",
        });
        return;
    } catch (error: any) {
        res.status(500).json({ message: error.message });
        return;
    }
};
