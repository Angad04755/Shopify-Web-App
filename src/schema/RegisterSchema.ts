import { z } from "zod";

export const RegisterSchema = z.object({
    email: z.email(),
    password: z.string().min(6, "password must be at least 6 characters").min(6),
    confirm_password: z.string().min(1, "Required")
}).refine((data) => data.confirm_password === data.password, { message: "Password did not match", path: ["confirm_password"] })

export type RegisterType = z.infer<typeof RegisterSchema>;