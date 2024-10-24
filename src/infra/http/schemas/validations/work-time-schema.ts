import { z } from 'zod'

const body = z.object({
  clinicId: z.string().uuid({ message: 'Campo obrigatório!' }),
  week: z.string().min(5, { message: 'Campo obrigatório!' }),
  times: z
    .object({
      description: z.string(),
      time: z.string()
    })
    .array(),
  open: z.enum(['true', 'false']).default('true')
})

const params = z.object({
  id: z.string().uuid({ message: 'Campo deve ser um UUID' })
})

const createWokTimeSchema = z.object({ params: params, body: z.array(body) })
export { createWokTimeSchema }
