import { z } from "zod";

export const LoginSchema = z.object({
    email: z.email("Invalid email"),
    password: z.string().nonempty("Password must be at least 6 characters").min(6),
})

export type LoginType = z.infer<typeof LoginSchema>