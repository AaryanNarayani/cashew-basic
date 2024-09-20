import z from 'zod';

export const SignupSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(6,"The password must be alteast 6 characters")
})

export const SiginSchema = z.object({
    email: z.string(),
    password: z.string(),
})

export const DepositSchema = z.object({
    amount: z.number()
})

export const TransferSchema = z.object({
    to: z.number(),
    amount: z.number(),
})


