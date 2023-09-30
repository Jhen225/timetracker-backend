import express, { NextFunction, Response, Request } from 'express';
import cors from 'cors';
import AccountRouter from './routers/AccountRouter';
import { service_logger } from './common/logger';
const PORT = process.env.PORT || 3000;
const app = express()


app.use(express.json());
app.use(cors())

const server = AccountRouter(app);

server.use('*', (req: Request, res: Response, next: NextFunction) => {
    return res.status(404).end();
})

server.listen(PORT, () => service_logger.info(`Server started on port ${PORT}`))
