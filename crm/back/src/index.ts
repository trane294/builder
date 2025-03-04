import app from './infrastructure/server';
import swaggerDocs from './infrastructure/swagger';
import logger from './infrastructure/winston';
import * as dotenv from 'dotenv';

dotenv.config();

async function main() {
    const port = process.env.port || 3000;

    app.listen(port, async () => {
        logger.info(`App is running at http://localhost:${port}`);
        swaggerDocs(app, port.toString());
    });
}

main();