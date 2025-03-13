import express from "express";
import helmet from "helmet";
import cors from 'cors';
import userRoutes from "../routes/userRoutes";
import websiteRoutes from "../routes/websiteRoutes";
import fileRoutes from "../routes/fileRoutes";
import subscriptionRoutes from "../routes/subscriptionRoutes";

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = ["http://localhost:5173"];

const options: cors.CorsOptions = {
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(helmet());
app.use(cors(options));

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());

// Mounting routes
app.use("/api/user", userRoutes);
app.use("/api/website", websiteRoutes);
app.use("/api/file", fileRoutes);
app.use("/api/subscription", subscriptionRoutes);


export default app;
