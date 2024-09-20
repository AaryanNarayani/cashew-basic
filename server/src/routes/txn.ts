import express from 'express'
import { AuthMiddleware } from '../middleware'
import { DepositSchema, TransferSchema } from '../types'
import { getPrisma } from '../db'
const router = express.Router()

router.get('/',(req,res)=>{
    res.send("Welcome to txn")
})

router.post('/deposit', AuthMiddleware, async (req: any, res) => {
try {
    const to = Number(req.userId); // User ID from AuthMiddleware
    const body = req.body;

    // Validate the request body against the DepositSchema
    const parsedBody = DepositSchema.safeParse(body);

    if (!parsedBody.success) {
        return res.status(411).json({
            message: "Invalid Inputs sent"
        });
    }

    // Extract the amount from the parsed body
    const { amount } = parsedBody.data;

    const prisma = getPrisma();
    const updatedAmount = amount*100;

    // Update the user's balance by incrementing it with the deposit amount
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

    // Respond with the updated account details
    res.status(200).json({
        message: "Deposit successful",
        account: updatedAccount
    });

} catch (e) {
    // Handle errors (e.g., user not found, database issues)
    console.error(e);
    res.status(500).json({
        message: "Internal Server Error"
    });
}
});

router.post('/transfer', AuthMiddleware, async (req: any, res) => {
try {
    const from = Number(req.userId); // User ID from AuthMiddleware
    const body = req.body;

    // Validate the request body against the TransferSchema
    const parsedBody = TransferSchema.safeParse(body);

    if (!parsedBody.success) {
        return res.status(411).json({
            message: "Incorrect inputs sent"
        });
    }

    const { to, amount } = parsedBody.data;
    const Amount = amount*100;

    const prisma = getPrisma();

    // Check if the sender's balance is sufficient
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

    // Perform the transfer in a transaction to ensure atomicity
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

    // Respond with success
    res.status(200).json({
        message: "Transfer successful",
        transaction: transferTransaction
    });

} catch (e) {
    // Handle errors (e.g., user not found, database issues)
    console.error(e);
    res.status(500).json({
        message: "Internal Server Error "+e
    });
}
});

export default router
