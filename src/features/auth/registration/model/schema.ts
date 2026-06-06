import { z } from 'zod'

export const registerSchema = z.object({
  login: z.string().min(1, "Введите логин"),
  name: z.string().min(1, "Введите корректное имя"),
  password: z.string().min(1, "Введите пароль"),
  passwordReturn: z.string().min(1, "Введите пароль"),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
