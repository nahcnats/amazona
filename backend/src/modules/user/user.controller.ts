import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { prisma, hashPassword } from '../../utils';
import { UserTypes } from '../../types';

export async function registerUserHandler(req: Request, res: Response) {
    const { name, email, password }: UserTypes = req.body;

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

export async function getUsersHandler(req: Request, res: Response) {
    try {
        const users = await prisma.user.findMany();

        res.status(StatusCodes.OK).send(users);
    } catch (e: any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
    }
}

export async function getUserHandler(req: Request, res: Response) {
    const { id } = req.params;

    try {
        const user = await prisma.user.findUnique({
            select: {
                id: true,
                name: true,
                email: true,
                isAdmin: true,
                isActive: true,
                createdAt: true,
                updatedAt: true
            },
            where: {
                id: Number(id)
            }
        });

        res.status(StatusCodes.OK).send(user);
    } catch (e: any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
    }
}

export async function editUserHandler(req: Request, res: Response) {
    const { id, name, isAdmin, isActive } = req.body;

    try {
        await prisma.user.update({
            data: {
                name: name,
                isAdmin: isAdmin,
                isActive: isActive
            },
            where: {
                id: Number(id)
            }
        });
    } catch (e: any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
    }
}