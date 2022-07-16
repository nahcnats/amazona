import argon2 from 'argon2';

export async function hashPassword(password: string) {
    return await argon2.hash(password);
}

export function comparePassword(hashedPassword: string, password: string): Promise<boolean> {
    return argon2.verify(hashedPassword, password)
}