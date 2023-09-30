import { NextFunction, Request, Response, Express } from "express"
import { LoginController } from "../controllers";

const AccountRouter = (app: Express) => {
    app.post('/account/login', LoginController(null))

    return app;
}

export default AccountRouter;