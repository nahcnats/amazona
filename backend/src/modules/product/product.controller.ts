import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { prisma } from '../../utils';
import { CategoryTypes } from '../../types';

export async function newCategoryHandler(req: Request, res: Response) {
    const { name }: CategoryTypes = req.body;

    try {
        const existingCategory = await prisma.$queryRaw<{ id: number }[]>`
            SELECT id FROM category
            WHERE name LIKE ${`%${name}%`}  
        `;

        if (existingCategory.length) {
            return res.status(StatusCodes.CONFLICT).send('Category already exists');
        }

        await prisma.category.create({
            data: {
                name: name
            }
        });

        res.status(StatusCodes.CREATED).send('Category created successfully');
    } catch (e: any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
    }
}

export async function getCategoriesHandler(req: Request, res: Response) {
    try {
        const categories = await prisma.category.findMany();

        res.status(StatusCodes.OK).send(categories);
    } catch (e: any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
    }
}

export async function getCategoryHandler(req: Request, res: Response) {
    const { id } = req.params;

    try {
        const category = await prisma.category.findUnique({
            select: {
                id: true,
                name: true,
                createdAt: true,
                updatedAt: true
            },
            where: {
                id: Number(id)
            }
        });

        res.status(StatusCodes.OK).send(category);
    } catch (e: any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
    }
}

export async function editCategoryHandler(req: Request, res: Response) {
    const { id } = req.body;

    try {
        await prisma.category.update({
            data: {
                id: Number(id)
            },
            where: {
                id: Number(id)
            }
        });
    } catch (e: any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
    }
}

export async function name(req: Request, res: Response) {
    const { id } = req.params;

    try {
        await prisma.category.delete({
            where: {
                id: Number(id)
            }
        });
        
        res.status(StatusCodes.OK).send('Category deleted succesfully');
    } catch (e: any) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
    }
}