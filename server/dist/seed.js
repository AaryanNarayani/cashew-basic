"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Seed = void 0;
const db_1 = require("./db");
const bcrypt_1 = __importDefault(require("bcrypt"));
async function Seed() {
    const db = (0, db_1.getPrisma)();
    const decodedPw = await bcrypt_1.default.hash('guest@123', 10);
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
exports.Seed = Seed;
