import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { prisma, hashPassword } from '../../utils';
import { UserInput } from '../../types';

export async function registerUserHandler(req: Request, res: Response) {
    const { name, email, password }: UserInput = req.body;

    if (!name || !email || !password || name === '' || email === '' || password === '') {
        res.status(StatusCodes.UNAUTHORIZED).send('All fields required');
    }

    try {
        const existingUser = await prisma.user.findUnique({
            select: {
                email: true,
            },
            where: {
                email: email
            }
        });
        
        if (existingUser) {
            return res.status(StatusCodes.CONFLICT).send('User already exists');
        }

        const hashedPassword = await hashPassword(password);

        await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword
            }
        });

        res.status(StatusCodes.CREATED).send('User created successfully');
    } catch (e: any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
    }
}