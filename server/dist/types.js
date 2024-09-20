"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSchema = exports.TransferSchema = exports.DepositSchema = exports.SiginSchema = exports.SignupSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.SignupSchema = zod_1.default.object({
    name: zod_1.default.string(),
    email: zod_1.default.string(),
    password: zod_1.default.string().min(6, "The password must be alteast 6 characters")
});
exports.SiginSchema = zod_1.default.object({
    email: zod_1.default.string(),
    password: zod_1.default.string(),
});
exports.DepositSchema = zod_1.default.object({
    amount: zod_1.default.number()
});
exports.TransferSchema = zod_1.default.object({
    to: zod_1.default.number(),
    amount: zod_1.default.number(),
});
exports.UpdateSchema = zod_1.default.object({
    id: zod_1.default.number(),
    email: zod_1.default.string(),
    name: zod_1.default.string(),
});
