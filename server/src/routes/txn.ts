import express from 'express'
import { AuthMiddleware } from '../middleware'
import { DepositSchema, TransferSchema } from '../types'
import { getPrisma } from '../db'
const router = express.Router()

router.get('/',(_,res)=>{
    res.send("Welcome to txn")
})

router.post('/deposit', AuthMiddleware, async (req: any, res) => {
try {
    const to = Number(req.userId); // User ID from AuthMiddleware
    const body = req.body;

    const parsedBody = DepositSchema.safeParse(body);

    if (!parsedBody.success) {
        return res.status(411).json({
            message: "Invalid Inputs sent"
        });
    }

    const { amount } = parsedBody.data;

    const prisma = getPrisma();
    const updatedAmount = amount*100;

    const updatedAccount = await prisma.account.update({
        where: {
            userId: to
        },
        data: {
            balance: {
                increment: updatedAmount
            }
        }
    });

    res.status(200).json({
        message: "Deposit successful",
        account: updatedAccount
    });

} catch (e) {
    console.error(e);
    res.status(500).json({
        message: "Internal Server Error"
    });
}
});

router.post('/transfer', AuthMiddleware, async (req: any, res) => {
try {
    const from = Number(req.userId); 
    const body = req.body;

    const parsedBody = TransferSchema.safeParse(body);

    if (!parsedBody.success) {
        return res.status(411).json({
            message: "Incorrect inputs sent"
        });
    }

    const { to, amount } = parsedBody.data;
    const Amount = amount*100;

    const prisma = getPrisma();

    const senderAccount = await prisma.account.findFirst({
        where: {
            userId: from
        }
    });

    if (!senderAccount) {
        return res.status(404).json({
            message: "Sender account not found"
        });
    }

    if (senderAccount.balance < Amount) {
        return res.status(403).json({
            message: "Insufficient Balance"
        });
    }

    const transferTransaction = await prisma.$transaction([
        prisma.account.update({
            where: { userId: from },
            data: {
                balance: {
                    decrement: Amount
                }
            }
        }),
        prisma.account.update({
            where: { userId: to },
            data: {
                balance: {
                    increment: Amount
                }
            }
        }),
        prisma.history.create({
            data: {
                from: from,
                to: to,
                amount: Amount,
                date: new Date()
            }
        })
    ]);

    res.status(200).json({
        message: "Transfer successful",
        transaction: transferTransaction
    });

} catch (e) {
    console.error(e);
    res.status(500).json({
        message: "Internal Server Error "+e
    });
}
});

export default router
