import express, { NextFunction, Response, Request } from 'express';
import cors from 'cors';
import AccountRouter from './routers/AccountRouter';
const PORT = process.env.PORT || 3000;
const app = express()


app.use(express.json());
app.use(cors())



// app.use('/auth', AuthRouter(app));

const server = AccountRouter(app);



server.use('*', (req: Request, res: Response, next: NextFunction) => {
    return res.status(404).end();
})

server.listen(PORT, () => console.log(`Server started on port ${PORT}`))
