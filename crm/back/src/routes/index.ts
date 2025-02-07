import { Express, Request, Response } from 'express';

function userRoutes(app: Express) {
    app.get('/', async (req: Request, res: Response) => {
        res.send("Express + TypeScript Server");
    });
};

export default userRoutes;