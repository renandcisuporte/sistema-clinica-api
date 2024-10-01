import { z } from 'zod'

const params = z.object({ id: z.string().uuid({ message: 'Requer um ID ' }) })

const body = z.object({
  userId: z.string().uuid().optional(),
  title: z.string().min(1, { message: 'Campo obrigatório!' }),
  fantasy: z
    .string()
    .min(1, { message: 'Campo obrigatório!' })
    .max(55, { message: 'Requer máximo de 55 caracteres' }),
  cnpj: z
    .string()
    .min(1, { message: 'Campo obrigatório!' })
    .max(18, { message: 'Requer máximo de 18 caracteres' }),
  ie: z
    .string()
    .min(1, { message: 'Campo obrigatório!' })
    .max(18, { message: 'Requer máximo de 55 caracteres' }),
  phones: z.array(z.object({})).optional(),
  address: z.object({}).optional()
})

const deleteOrFirstClinicSchema = z.object({ params })
const createClinicSchema = z.object({ body })
const updateClinicSchema = z.object({ params, body })

export { createClinicSchema, deleteOrFirstClinicSchema, updateClinicSchema }
