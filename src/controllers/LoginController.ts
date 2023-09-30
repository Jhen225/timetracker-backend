import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express"
import bcrypt from 'bcrypt';
import { ZodError, z } from 'zod';
import { service_logger } from "../common/logger";
import jwt from 'jsonwebtoken';

const LoginRequest = z.object({
    email: z.string().email(),
    password: z.string().regex(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[a-zA-Z]).{8,}$/))
})


export const LoginController = (dbClient: PrismaClient) => {
    return async (req: Request, res: Response) => {
        try {
            const loginRequest = await LoginRequest.parseAsync(req.body);
            const account = await dbClient.account.findFirst({ where: { email: `${loginRequest.email}` } });
            if (account == null || account == undefined) {
                service_logger.info(`No account found with email ${loginRequest.email}`);
                return res.status(404).end();
            }
            const isValid = await bcrypt.compare(loginRequest.password, account.password);
            
            if (!isValid) {
                service_logger.info(`Invalid password provided for ${loginRequest.email}`);
                return res.status(403).end();
            }

            const token = await jwt.sign({  },'ADSFao32Ds$dbnfLW3R08Yhwcn@$', {
                expiresIn: '1d',
                issuer: "TIMETRACKER",
                audience: account.account_id
            })
            return res.status(200).json({ token, account_id: account.account_id });
        } catch (error: any) {
            if (error instanceof ZodError) {
                service_logger.error(`ValidationError: ${error.issues[0].path}: ${error.issues[0].message}`);
                return res.status(400).json({ message: `${error.issues[0].path}: ${error.issues[0].message}` })
            }
            
            service_logger.error(error.message);
            return res.status(500).send('Internal Server Error');
        }
        
    }
}