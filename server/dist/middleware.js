"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
function AuthMiddleware(req, res, next) {
    try {
        if (req.headers.authorization) {
            const header = req.headers.authorization;
            const tokenParts = header.split(' ');
            if (tokenParts[0] !== 'Bearer' || tokenParts.length !== 2) {
                return res.status(401).json({
                    message: 'Invalid or missing Bearer token',
                });
            }
            const token = tokenParts[1];
            const id = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
            req.userId = id.toString();
            next();
        }
        else {
            return res.status(401).json({
                message: "You don't have access",
            });
        }
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            message: "Error occurred: " + e,
        });
    }
}
exports.AuthMiddleware = AuthMiddleware;
