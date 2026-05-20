import {z} from "zod";

export const registerSchema = z.object({
    email: z.string().email("invalid email"),
    password: z.string().min(6, "password must be at least 6 characters"),
})

export const loginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

export type RegisterType = z.infer<typeof registerSchema>;
export type LoginType = z.infer<typeof loginSchema>