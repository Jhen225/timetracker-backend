import { NextFunction, Request, Response, Express } from "express"
import { LoginController, RegistrationController } from "../controllers";

const AccountRouter = (app: Express) => {
    app.post('/account/login', LoginController(null))
    app.post('/account/register', RegistrationController(null))

    return app;
}

export default AccountRouter;