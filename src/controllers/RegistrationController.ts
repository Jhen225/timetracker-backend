import { Request, Response } from "express"
import bcrypt from 'bcrypt';
import { ZodError, z } from 'zod';
import { service_logger } from "../common/logger";
import { PrismaClient } from "@prisma/client";

const ROUNDS = 12;

const RegistrationRequest = z.object({
    email: z.string().email(),
    password: z.string().regex(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[a-zA-Z]).{8,}$/))
})

export const RegistrationController = (dbClient: PrismaClient) => {
    return async (req: Request, res: Response) => {
        try {
            const regRequest = await RegistrationRequest.parseAsync(req.body);
            const salt = await bcrypt.genSalt(ROUNDS);
            const hash = await bcrypt.hash(regRequest.password, salt);

            const account = await dbClient.account.create({data: {email: regRequest.email, password: hash}});
            return res.status(201).json(account);
            
        } catch (error: any) {
            if (error.code === 'P2002') {
                service_logger.error("Unique constraint violation");
                return res.status(400).json({ message: "Unique constraint violation"})
            }
            if (error instanceof ZodError) {
                service_logger.error(`ValidationError: ${error.issues[0].path}: ${error.issues[0].message}`);
                return res.status(400).json({ message: `${error.issues[0].path}: ${error.issues[0].message}` })
            }
            
            service_logger.error(error.message);
            return res.status(500).send('Internal Server Error');
        }
    }
}