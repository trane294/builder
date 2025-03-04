import express, { Request, Response } from "express";
import helmet from "helmet";
import userRoutes from "../routes/userRoutes";
import swaggerDocs from "./swagger";
import logger from "./winston";

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(
    cors({
        origin: ["*"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());

// Mounting routes
app.use("/api/user", userRoutes);

export default app;
