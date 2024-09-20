import express from 'express'
import { getPrisma } from '../db';
import { DECIMAL } from '../config';
import { AuthMiddleware } from '../middleware';
import { UpdateSchema } from '../types';
const router = express.Router()

router.get('/all',async(req,res)=>{
    try{
        const prisma = getPrisma();
        const allUsers =  await prisma.user.findMany();
        res.status(200).json({
            allUsers
        })
    }catch(e:any){
        res.status(500).json({
            message: "Error Occured while fetching all users"+e.message
        })
    }
})

router.post('/validate',AuthMiddleware,(req:any,res)=>{
    try{
        const id = req.userId;
        res.status(200).json({
            message: "User is Validated",
            id,
        })
    }catch(e){
        res.status(400).json({
            error: "Error occured validating the user"+e
        })
    }
})

router.put('/update',AuthMiddleware,async (req,res)=>{
    try{
        const payload = req.body;
        const parsedPayload = UpdateSchema.safeParse(payload);
        if(!parsedPayload.success){
            return res.status(411).json({
                message: "Wrong inputs sent to this api"
            })
        }
        const prisma = getPrisma();
        const user = await prisma.user.update({
            where:{
                id: payload.id,
            },
            data:{
                name: payload.name,
                email: payload.email
            }
        })
        res.status(200).json({
            message: "Update successfull",
            id: user.id,
            email: user.email,
            name: user.name
        })
    }catch(e){
        console.error("Update Error: ", e); 
        res.status(500).json({
            message: "Error Occured while Updating the user"
        })
    } 
})

router.get('/:id',async (req,res)=>{
try{
    const params = req.params.id;
    const prisma = getPrisma();
    const details = await prisma.user.findFirst({
        where:{
            id: parseInt(params)
        }
    })
    res.status(200).json({
        details
    })
}catch(e){
    res.status(500).json({
        message: "Error Occured "+e
    })
}
})

router.get('/:id/balance',async (req,res)=>{
try{
    const params = req.params.id;
    const prisma = getPrisma();
    const user = await prisma.user.findFirst({
        where:{
            id: Number(params)
        }
    })

    const account = await prisma.account.findFirst({
        where: {
            userId: Number(user?.id)
        }
    })

    if(!account){
        return res.status(404).json({
            message: "User and Account not found"
        })
    }
    const balance = account.balance/DECIMAL;
    res.status(200).json({
        user,
        balance: balance
    })
}catch(e){
    res.status(500).json({
        message: 'Error Occured '+e
    })
}
})

router.get('/:id/history',async (req,res)=>{
try{
    const params = req.params.id
    const prisma = getPrisma();
    const userHistory = await prisma.history.findMany({
        where: {
            OR: [
                { from: Number(params) },
                { to: Number(params) }
            ]
        },
        orderBy: {
            date: 'asc'  
        }
    });
    res.status(200).json({
        userHistory
    })
}catch(e){
    res.status(500).json({
        message: "Error Occure "+e
    })
}
})

export default router
