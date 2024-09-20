import { getPrisma } from "./db";
import bcrypt from 'bcrypt'

export async function Seed() {
const db = getPrisma()
const decodedPw = await bcrypt.hash('guest@123',10) 
const [user, account] = await db.$transaction(async (tx) => {
    const user = await tx.user.upsert({
        where: { email: 'guest@email.com' },
        update: {},
        create: {
            name: 'guest',
            email: 'guest@email.com',
            password: decodedPw.toString(),
        }
    });

    const account = await tx.account.upsert({
        where: { 
            userId: user.id
        },
        update: {},
        create: {
            userId: user.id,
            balance: Math.random() * 100000   
        }
    });

    return [user, account];
});

console.log('Seeded:', { user, account });
}