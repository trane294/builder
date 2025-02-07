import express, { Request, Response } from 'express';
import user_routes from '../routes/index';
import helmet from 'helmet';
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const cors = require('cors');

const app = express();

app.use(helmet());
app.use(
    cors({
        origin: ['*'],
        methodes: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    })
);

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());

user_routes(app);

export default app;
