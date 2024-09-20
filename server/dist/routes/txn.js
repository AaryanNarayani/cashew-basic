"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../middleware");
const types_1 = require("../types");
const db_1 = require("../db");
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.send("Welcome to txn");
});
router.post('/deposit', middleware_1.AuthMiddleware, async (req, res) => {
    try {
        const to = Number(req.userId); // User ID from AuthMiddleware
        const body = req.body;
        // Validate the request body against the DepositSchema
        const parsedBody = types_1.DepositSchema.safeParse(body);
        if (!parsedBody.success) {
            return res.status(411).json({
                message: "Invalid Inputs sent"
            });
        }
        // Extract the amount from the parsed body
        const { amount } = parsedBody.data;
        const prisma = (0, db_1.getPrisma)();
        const updatedAmount = amount * 100;
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
    }
    catch (e) {
        // Handle errors (e.g., user not found, database issues)
        console.error(e);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});
router.post('/transfer', middleware_1.AuthMiddleware, async (req, res) => {
    try {
        const from = Number(req.userId); // User ID from AuthMiddleware
        const body = req.body;
        // Validate the request body against the TransferSchema
        const parsedBody = types_1.TransferSchema.safeParse(body);
        if (!parsedBody.success) {
            return res.status(411).json({
                message: "Incorrect inputs sent"
            });
        }
        const { to, amount } = parsedBody.data;
        const Amount = amount * 100;
        const prisma = (0, db_1.getPrisma)();
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
    }
    catch (e) {
        // Handle errors (e.g., user not found, database issues)
        console.error(e);
        res.status(500).json({
            message: "Internal Server Error " + e
        });
    }
});
exports.default = router;
