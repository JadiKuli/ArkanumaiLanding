import { z } from "zod";

export const RegisterSchema = z
  .object({
    username: z.string().min(3).max(20),
    password: z.string().min(6),
    repeatPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords do not match",
    path: ["repeatPassword"],
  });

export type RegisterType = z.infer<typeof RegisterSchema>;
