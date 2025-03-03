import { Request, Response } from "express";

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

export const getUserProfile = async (req: Request, res: Response) => {
    res.status(200).json({
        firstName: "FakeUserFirstName",
    });
    return;
};
