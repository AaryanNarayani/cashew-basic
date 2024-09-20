import express from 'express'
import { SiginSchema, SignupSchema } from '../types'
import { getPrisma } from '../db'
import bcrypt from 'bcrypt'
import { JWT_SECRET } from '../config'
import jwt from 'jsonwebtoken'
const router = express.Router()

router.get('/',(req,res)=>{
    res.send("Welcome to Auth")
})


router.post('/signin',async (req,res)=>{
try {
    // Parse and validate the request body
    const body = req.body;
    const safe = SiginSchema.safeParse(body);
    if (!safe.success) {
        return res.status(411).json(
        {
            message: 'Incorrect credentials sent',
        });
    }

    // Initialize Prisma and find the user by email
    const prisma = getPrisma();
    const user = await prisma.user.findFirst({
        where: {
        email: body.email,
        },
    });

    if (!user) {
        return res.status(401).json(
        {
            message: 'Invalid email or password',
        });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(body.password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json(
        {
            message: 'Invalid email or password',
        });
    }

    // Generate a JWT token
    const token = jwt.sign(user.id.toString(),JWT_SECRET)    
    console.log(`User ${user.id} Signed in`);
    // Return the token
    return res.status(200).json(
        {
        message: 'Signin successful',
        token,
        });
    } catch (e) {
    console.error(e); // Log the error for debugging purposes
    return res.status(500).json(
        {
        error: 'An error occurred during signin.',
        });
    }
})


router.post('/signup',async (req,res)=>{
try{
    // Parse the request body
    const body = req.body;
    
    // Validate using zod
    const safe = SignupSchema.safeParse(body);
    if (!safe.success) {
        return res.status(411).json(
        {
            message: 'Incorrect credentials sent',
        });
    } 
    // Store in db
    const prisma = getPrisma();
    
    const exists = await prisma.user.findFirst({
        where:{
            email: body.email
        }
    })
    
    if(exists){
        return res.status(409).json({
            message: "User with this email already Exists."
        });
    }
    
    const hashedPw = await bcrypt.hash(body.password,10);
    const user = await prisma.user.create({
        data:{
            name: body.name,
            email: body.email,
            password: hashedPw
        }
    })

    const account = await prisma.account.create({
        data:{
            userId: user.id,
            balance: Math.random()*100000
        }
    })

    // Jwt token gen
    const token = jwt.sign(user.id.toString(),JWT_SECRET);
    // return token
    return res.status(200).json({
        message: 'Signup Successful',
        token,
        account: account.id
    });
    }catch(e){
        return res.status(500).json({
            error: "Error Occured "+ e
        })    
    }
})
export default router
