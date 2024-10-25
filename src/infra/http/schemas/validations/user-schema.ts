import { z } from 'zod'

const body = z
  .object({
    fullName: z
      .string({ message: 'Campo fullName obrigatório!' })
      .min(1, { message: 'Campo obrigatório!' }),
    email: z
      .string({ message: 'Campo email obrigatório!' })
      .email({ message: 'Campo obrigatório!' }),
    admin: z.enum(['user', 'admin', 'root']).default('user'),
    password: z
      .string({ message: 'Campo password obrigatório!' })
      .min(6, { message: 'Digite minimo de 6 caracteres' })
      .max(12, { message: 'Digite maximo de 12 caracteres' }),
    confirmPassword: z
      .string({ message: 'Campo confirmPassword obrigatório!' })
      .min(6, { message: 'Digite minimo de 6 caracteres' })
      .max(12, { message: 'Digite maximo de 12 caracteres' }),
    coverImage: z.string().optional()
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'As senhas não conferem',
    path: ['confirmPassword']
  })

const createUserSchema = z.object({ body })

export { createUserSchema }
