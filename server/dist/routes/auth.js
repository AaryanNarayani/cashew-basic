"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const types_1 = require("../types");
const db_1 = require("../db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = require("../config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.send("Welcome to Auth");
});
router.post('/signin', async (req, res) => {
    try {
        // Parse and validate the request body
        const body = req.body;
        const safe = types_1.SiginSchema.safeParse(body);
        if (!safe.success) {
            return res.status(411).json({
                message: 'Incorrect credentials sent',
            });
        }
        // Initialize Prisma and find the user by email
        const prisma = (0, db_1.getPrisma)();
        const user = await prisma.user.findFirst({
            where: {
                email: body.email,
            },
        });
        if (!user) {
            return res.status(401).json({
                message: 'Invalid email or password',
            });
        }
        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt_1.default.compare(body.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'Invalid email or password',
            });
        }
        // Generate a JWT token
        const token = jsonwebtoken_1.default.sign(user.id.toString(), config_1.JWT_SECRET);
        console.log(`User ${user.id} Signed in`);
        // Return the token
        return res.status(200).json({
            message: 'Signin successful',
            token,
        });
    }
    catch (e) {
        console.error(e); // Log the error for debugging purposes
        return res.status(500).json({
            error: 'An error occurred during signin.',
        });
    }
});
router.post('/signup', async (req, res) => {
    try {
        // Parse the request body
        const body = req.body;
        // Validate using zod
        const safe = types_1.SignupSchema.safeParse(body);
        if (!safe.success) {
            return res.status(411).json({
                message: 'Incorrect credentials sent',
            });
        }
        // Store in db
        const prisma = (0, db_1.getPrisma)();
        const exists = await prisma.user.findFirst({
            where: {
                email: body.email
            }
        });
        if (exists) {
            return res.status(409).json({
                message: "User with this email already Exists."
            });
        }
        const hashedPw = await bcrypt_1.default.hash(body.password, 10);
        const user = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: hashedPw
            }
        });
        const account = await prisma.account.create({
            data: {
                userId: user.id,
                balance: Math.random() * 100000
            }
        });
        // Jwt token gen
        const token = jsonwebtoken_1.default.sign(user.id.toString(), config_1.JWT_SECRET);
        // return token
        return res.status(200).json({
            message: 'Signup Successful',
            token,
            account: account.id
        });
    }
    catch (e) {
        return res.status(500).json({
            error: "Error Occured " + e
        });
    }
});
exports.default = router;
