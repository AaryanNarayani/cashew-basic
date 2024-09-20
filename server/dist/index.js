"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_1 = __importDefault(require("./routes/user"));
const auth_1 = __importDefault(require("./routes/auth"));
const txn_1 = __importDefault(require("./routes/txn"));
const seed_1 = require("./seed");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/v1/user', user_1.default);
app.use('/api/v1/auth', auth_1.default);
app.use('/api/v1/txn', txn_1.default);
(async () => {
    try {
        await (0, seed_1.Seed)();
        console.log('Database seeded successfully');
    }
    catch (error) {
        console.error('Error seeding database:', error);
    }
})();
app.get('/', (req, res) => {
    res.send("Hello");
});
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
