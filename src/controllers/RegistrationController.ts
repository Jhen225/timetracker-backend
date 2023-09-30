import { Request, Response } from "express"

export const RegistrationController = (dbClient: any) => {
    return (req: Request, res: Response) => {
        return res.send('Logging in');
    }
}