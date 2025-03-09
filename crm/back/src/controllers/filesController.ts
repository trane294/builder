import { Request, Response, NextFunction } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { AuthenticatedRequestWithFile } from "../middleware/authMiddleware";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import logger from "../infrastructure/winston";

const s3Client = new S3Client({
    region: "auto", // Use 'auto' for Cloudflare R2
    endpoint: process.env.CLOUDFLARE_ENDPOINT, // Your Cloudflare R2 endpoint
    credentials: {
        accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID as string, // Your Cloudflare R2 Access Key ID
        secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY as string, // Your Cloudflare R2 Secret Access Key
    },
});

// logger.info(`CLOUDFLARE_ENDPOINT: ${process.env.CLOUDFLARE_ENDPOINT}`);
// logger.info(`CLOUDFLARE_ACCESS_KEY_ID: ${process.env.CLOUDFLARE_ACCESS_KEY_ID}`);
// logger.info(`CLOUDFLARE_SECRET_ACCESS_KEY: ${process.env.CLOUDFLARE_SECRET_ACCESS_KEY}`);
// logger.info(`CLOUDFLARE_BUCKET_NAME: ${process.env.CLOUDFLARE_BUCKET_NAME}`);
// logger.info(`CLOUDFLARE_SUBDOMAIN: ${process.env.CLOUDFLARE_SUBDOMAIN}`);

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, "..", "uploads");
        // Create the uploads directory if it doesn't exist
        fs.mkdirSync(uploadDir, { recursive: true });
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const fileExtension = path.extname(file.originalname);
        cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
    },
});

const upload = multer({ storage: storage });
// const upload = multer();

/**
 * @openapi
 * /api/file:
 *   post:
 *     summary: Upload an image file
 *     tags:
 *       - Upload
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: File uploaded successfully
 *                 filename:
 *                   type: string
 *                   example: image-1678886400000-123456789.jpg
 *                 filepath:
 *                   type: string
 *                   example: /uploads/image-1678886400000-123456789.jpg
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No file uploaded
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       500:
 *         $ref: '#/components/responses/InternalServerError'
 */
export const uploadFile = async (
    req: AuthenticatedRequestWithFile,
    res: Response,
    next: NextFunction
) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const userId = req.userId;
        const filename = req.file.filename;
        const filepath = req.file.path;
        const fileContent = fs.readFileSync(filepath);

        const bucket = process.env.CLOUDFLARE_BUCKET_NAME;
        const key = `storage/${userId}/files/${filename}`;

        // Upload to Cloudflare R2
        const putObjectCommand = new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: fileContent,
            ContentType: req.file.mimetype,
            ACL: "public-read",
        });

        await s3Client.send(putObjectCommand);

        // Delete the temporary file
        fs.unlinkSync(filepath);

        // Construct the public URL
        const publicUrl = `${process.env.CLOUDFLARE_SUBDOMAIN}/${key}`;

        res.status(201).json({
            message: "File uploaded successfully",
            filename: filename,
            url: publicUrl,
        });
    } catch (error) {
        console.error("Error uploading file:", error);
        next(error);
    }
};

export default upload;