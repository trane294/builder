import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthenticatedRequest } from "../middleware/authMiddleware";

const prisma = new PrismaClient();

/**
 * @openapi
 * /api/website:
 *   get:
 *     summary: Get all websites with user info
 *     tags:
 *       - Website
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of websites
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: My Website
 *                   description:
 *                     type: string
 *                     example: Website description
 *                   templateId:
 *                     type: integer
 *                     example: 1
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                   user:
 *                     type: object
 *                     properties:
 *                       firstName:
 *                         type: string
 *                         example: John
 *                       lastName:
 *                         type: string
 *                         example: Doe
 *       401:
 *         description: Unauthorized - Missing token
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Unauthorized - Missing token
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
export const getAllWebsites = async (
    req: AuthenticatedRequest,
    res: Response
) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res
                .status(401)
                .json({ message: "Unauthorized - Missing user ID" });
        }

        const websites = await prisma.website.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                templateId: true,
                userId: true,
                createdAt: true,
                updatedAt: true,
                user: {
                    select: {
                        firstName: true,
                        lastName: true,
                    },
                },
            },
            where: { userId: userId, deletedAt: null },
        });

        res.status(200).json(websites);
    } catch (error: any) {
        console.error("Error getting websites:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * @openapi
 * /api/website/{id}:
 *   get:
 *     summary: Get a website by ID for authenticated user
 *     tags:
 *       - Website
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Website ID
 *     responses:
 *       200:
 *         description: Website found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Website'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Website not found
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const getWebsiteById = async (
    req: AuthenticatedRequest,
    res: Response
) => {
    try {
        const { id } = req.params;
        const userId = req.userId;

        if (!userId) {
            return res
                .status(401)
                .json({ message: "Unauthorized - Missing user ID" });
        }

        const websiteId = parseInt(id, 10);

        const website = await prisma.website.findUnique({
            where: { id: websiteId, userId: userId, deletedAt: null },
            select: {
                id: true,
                name: true,
                description: true,
                templateId: true,
                userId: true,
                createdAt: true,
                updatedAt: true,
                data: true,
                user: {
                    select: {
                        firstName: true,
                        lastName: true,
                    },
                },
                template: {
                    select: {
                        name: true,
                        config: true,
                    },
                },
            },
        });

        if (!website) {
            return res.status(400).json({ message: "Website not found" });
        }

        res.status(200).json(website);
    } catch (error: any) {
        console.error("Error getting website by ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * @openapi
 * /api/website:
 *   post:
 *     summary: Create a new website
 *     tags:
 *       - Website
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               templateId:
 *                 type: integer
 *               data:
 *                 type: object
 *     responses:
 *       201:
 *         description: Website created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Website created successfully
 *                 websiteId:
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
 *                   example: Name and templateId are required
 *       401:
 *         description: Unauthorized - Missing token
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Unauthorized - Missing token
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
export const createWebsite = async (
    req: AuthenticatedRequest,
    res: Response
) => {
    try {
        const { name, description, templateId, data } = req.body;
        const userId = req.userId;

        if (!name || !templateId) {
            return res
                .status(400)
                .json({ message: "Name and templateId are required" });
        }

        if (!userId) {
            return res
                .status(401)
                .json({ message: "Unauthorized - Missing user ID" });
        }

        const website = await prisma.website.create({
            data: {
                name,
                description,
                template: {
                    connect: { id: templateId },
                },
                user: {
                    connect: { id: userId },
                },
                data,
            },
        });

        res.status(201).json({
            message: "Website created successfully",
            websiteId: website.id,
        });
    } catch (error: any) {
        console.error("Error creating website:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * @openapi
 * /api/website/{id}:
 *   put:
 *     summary: Update a website
 *     tags:
 *       - Website
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Website ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               templateId:
 *                 type: integer
 *               data:
 *                 type: object
 *     responses:
 *       200:
 *         description: Website updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Website updated successfully
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Website not found
 *       401:
 *         description: Unauthorized - Missing token
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Unauthorized - Missing token
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
export const updateWebsite = async (
    req: AuthenticatedRequest,
    res: Response
) => {
    try {
        const { id } = req.params;
        const { name, description, templateId, data } = req.body;
        const userId = req.userId;

        if (!userId) {
            return res
                .status(401)
                .json({ message: "Unauthorized - Missing user ID" });
        }

        const websiteId = parseInt(id, 10);

        const existingWebsite = await prisma.website.findUnique({
            where: { id: websiteId },
        });

        if (!existingWebsite) {
            return res.status(400).json({ message: "Website not found" });
        }

        const updatedWebsite = await prisma.website.update({
            where: { id: websiteId },
            data: {
                name,
                description,
                template: templateId
                    ? { connect: { id: templateId } }
                    : undefined,
                data,
            },
        });

        res.status(200).json({ message: "Website updated successfully" });
    } catch (error: any) {
        console.error("Error updating website:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * @openapi
 * /api/website/{id}:
 *   delete:
 *     summary: Delete a website
 *     tags:
 *       - Website
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Website ID
 *     responses:
 *       200:
 *         description: Website deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Website deleted successfully
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Website not found
 *       401:
 *         description: Unauthorized - Missing token
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Unauthorized - Missing token
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
export const deleteWebsite = async (
    req: AuthenticatedRequest,
    res: Response
) => {
    try {
        const { id } = req.params;
        const userId = req.userId;

        if (!userId) {
            return res
                .status(401)
                .json({ message: "Unauthorized - Missing user ID" });
        }

        const websiteId = parseInt(id, 10);

        const existingWebsite = await prisma.website.findUnique({
            where: { id: websiteId, deletedAt: null },
        });

        if (!existingWebsite) {
            return res.status(400).json({ message: "Website not found" });
        }

        await prisma.website.update({
            where: { id: websiteId },
            data: {
                deletedAt: new Date(),
            },
        });

        res.status(200).json({ message: "Website deleted successfully" });
    } catch (error: any) {
        console.error("Error deleting website:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

/**
 * @openapi
 * /api/templates:
 *   get:
 *     summary: Get all templates
 *     tags:
 *       - Template
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of templates
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Template'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 *   components:
 *    schemas:
 *      Template:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *            example: 1
 *          name:
 *            type: string
 *            example: Template 1
 *          config:
 *            type: string
 *            example: photo1Config
 *          description:
 *            type: string
 *            example: Description for Template 1
 */
export const getAllTemplates = async (
    req: AuthenticatedRequest,
    res: Response
) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res
                .status(401)
                .json({ message: "Unauthorized - Missing user ID" });
        }

        const templates = await prisma.template.findMany();

        res.status(200).json(templates);
    } catch (error: any) {
        console.error("Error getting templates:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
