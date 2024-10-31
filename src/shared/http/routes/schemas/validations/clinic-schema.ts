import { z } from 'zod'

const params = z.object({
  id: z.string().uuid({ message: 'Campo deve ser um UUID' })
})

const body = z.object({
  userId: z.string().uuid({ message: 'Campo deve ser um UUID' }).optional(),
  title: z
    .string()
    .min(1, { message: 'Campo obrigatório!' })
    .max(55, { message: 'Máximo de 55 caracteres' }),
  fantasy: z
    .string()
    .min(1, { message: 'Campo obrigatório!' })
    .max(55, { message: 'Máximo de 55 caracteres' }),
  cnpj: z
    .string()
    .min(1, { message: 'Campo obrigatório!' })
    .max(18, { message: 'Máximo de 18 caracteres' }),
  ie: z.string().max(18, { message: 'Máximo de 18 caracteres' }).optional(),
  phone: z.string().optional(),
  mobilePhone: z.string().optional(),
  address: z
    .string()
    .max(50, { message: 'Máximo de 50 caracteres' })
    .optional(),
  number: z.string().max(5, { message: 'Máximo de 5 caracteres' }).optional(),
  neighborhood: z
    .string()
    .max(40, { message: 'Máximo de 40 caracteres' })
    .optional(),
  complement: z
    .string()
    .max(50, { message: 'Máximo de 50 caracteres' })
    .optional(),
  reference: z
    .string()
    .max(65, { message: 'Máximo de 65 caracteres' })
    .optional(),
  city: z.string().max(30, { message: 'Máximo de 3 caracteres' }).optional(),
  state: z.string().max(2, { message: 'Máximo de 2 caracteres' }).optional(),
  zipCode: z.string().max(9, { message: 'Máximo de 9 caracteres' }).optional()
})

const idSchema = z.object({ params })
const createClinicSchema = z.object({ body })
const updateClinicSchema = z.object({ params, body })

export { createClinicSchema, idSchema, updateClinicSchema }
