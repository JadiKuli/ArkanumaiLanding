import z from "zod";

export const LoginSchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(6),
});

export type LoginType = z.infer<typeof LoginSchema>;
