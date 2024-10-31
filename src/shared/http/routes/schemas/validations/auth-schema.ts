import * as z from 'zod'

export const authSchema = z.object({
  body: z.object({
    code: z.string().min(7, { message: 'Campo obrigatório' }),
    email: z.string().email({ message: 'Campo obrigatório/E-mail inválido' }),
    password: z.string().min(6, { message: 'Campo obrigatório' })
  })
})

export const authRefreshTokenSchema = z.object({
  headers: z.object({
    Authorization: z.string().refine((value) => value.startsWith('Bearer '), {
      message: 'Invalid Authorization header'
    })
  })
})
