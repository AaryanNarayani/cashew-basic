import express from 'express'
import cors from 'cors'
import userRouter from './routes/user'
import authRouter from './routes/auth'
import txnRouter from './routes/txn'
import { Seed } from './seed'

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/v1/user', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/txn', txnRouter);

(async () => {
    try {
        await Seed();
        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
})();

app.get('/', (req, res) => {
    res.send("Hello");
});

// const PORT = 8080; 
// app.listen(PORT, () => {
//     console.log(`Server is running on port: ${PORT}`);
// });

export default app;