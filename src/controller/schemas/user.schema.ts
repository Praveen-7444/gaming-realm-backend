import { z } from "zod";


export const createUserSchema = z.object({
  name: z.string().min(2).max(255),
  email: z.string().email(),
  username: z.string().min(2).max(255),
  password: z.string().min(6).max(255),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
