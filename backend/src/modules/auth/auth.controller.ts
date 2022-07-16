import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { prisma, comparePassword } from '../../utils';
import { signJwt } from './auth.utils';
import { UserInput } from '../../types';
import { CORS_ORIGIN } from '../../constants';

export async function loginHandler(req: Request, res: Response) {
    const { email, password }: UserInput = req.body;

    if (!email || !password || email === '' || password === '') {
        res.status(StatusCodes.UNAUTHORIZED).send('All fields required');
    }

    try {
        const user = await prisma.user.findFirst({
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
        
        if (!user || !comparePassword(user.password, password)) {
            return res.status(StatusCodes.UNAUTHORIZED).send('Invalid email or password');
        }

        const jwt = signJwt({
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
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