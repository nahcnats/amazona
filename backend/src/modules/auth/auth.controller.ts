import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { prisma, comparePassword } from '../../utils';
import { signJwt } from './auth.utils';
import { UserTypes } from '../../types';
import { CORS_ORIGIN } from '../../constants';

export async function loginHandler(req: Request, res: Response) {
    const { email, password }: UserTypes = req.body;

    if (!email || !password || email === '' || password === '') {
        res.status(StatusCodes.UNAUTHORIZED).send('All fields required');
    }

    try {
        const validUser = await prisma.user.findUnique({
            select: {
                name: true,
                email: true,
                password: true,
                isAdmin: true
            },
            where: {
                email: email
            }
        });
        
        if (!validUser || !comparePassword(validUser.password, password)) {
            return res.status(StatusCodes.UNAUTHORIZED).send('Invalid email or password');
        }

        const jwt = signJwt({
            name: validUser.name,
            email: validUser.email,
            isAdmin: validUser.isAdmin
        });

        res.cookie("accessToken", jwt, {
            maxAge: 3.154e10, // 1 year
            httpOnly: true,
            domain: CORS_ORIGIN.replace(/^[^.]+\./g, ''), 
            path: '/',
            sameSite: 'strict',
            secure: false
        });

        res.status(StatusCodes.OK).send("")
    } catch (e: any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
    }
}

export function logoutHandler(req: Request, res: Response) {
    res.clearCookie("accessToken", {
        domain: CORS_ORIGIN.replace(/^[^.]+\./g, ''),
        path: '/'
    });
    res.end();
}