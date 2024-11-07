import { z } from 'zod'

const params = z.object({
  id: z.string().uuid({ message: 'Campo deve ser um UUID' })
})

const body = z.object({
  clinicId: z.string().uuid({ message: 'Selecione uma Clinica' }).optional(),
  description: z.string().min(1, { message: 'Campo obrigatório!' }),
  active: z.boolean().optional().default(true),
  type: z.enum(['fixed', 'variable']).optional().default('fixed')
})

const paramsRealeseSchema = z.object({ params })
const createRealeseSchema = z.object({ body })
const updateRealeseSchema = z.object({ params, body })

export { createRealeseSchema, paramsRealeseSchema, updateRealeseSchema }
