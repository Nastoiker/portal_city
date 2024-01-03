import { z } from 'zod';
const UserLoginRequestSchema = z.object({
   email: z.string().email(),
   password: z.string(),
});
const UserLoginResponseSchema = z.object({
    accessToken: z.string();
});
export type UserLoginRequest = z.infer<typeof UserLoginRequestSchema>;