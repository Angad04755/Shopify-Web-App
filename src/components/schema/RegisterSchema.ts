import { z } from "zod";

export const RegisterSchema = z.object({
    email: z.email("invalid email"),
    password: z.string().nonempty("password must be at least 6 characters").min(6),
    confirm_password: z.string().nonempty("Required")
}).refine((data) => data.confirm_password === data.password, { message: "Password did not match", path: ["confirm_password"] })

export type RegisterType = z.infer<typeof RegisterSchema>;