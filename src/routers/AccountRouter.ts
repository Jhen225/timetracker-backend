import { NextFunction, Request, Response, Express } from "express"
import { LoginController, RegistrationController } from "../controllers";
import prisma from '../common/databaseClient';

const AccountRouter = (app: Express) => {
    app.post('/account/login', LoginController(prisma))
    app.post('/account/register', RegistrationController(prisma))

    return app;
}

export default AccountRouter;