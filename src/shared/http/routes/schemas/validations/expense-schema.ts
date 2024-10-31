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

const paramsExpenseSchema = z.object({ params })
const createExpenseSchema = z.object({ body })
const updateExpenseSchema = z.object({ params, body })

export { createExpenseSchema, paramsExpenseSchema, updateExpenseSchema }
