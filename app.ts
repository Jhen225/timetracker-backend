import express, { NextFunction, Response, Request } from 'express';
import cors from 'cors';
const PORT = process.env.PORT || 3000;
const app = express()

app.use(express.json());
app.use(cors())

app.use('*', (req: Request, res: Response, next: NextFunction) => {
    return res.status(404).end();
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
