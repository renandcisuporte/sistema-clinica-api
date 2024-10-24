import { z } from 'zod'

const params = z.object({
  id: z.string().uuid({ message: 'Campo deve ser um UUID' })
})

const body = z.object({
  clinicId: z.string().uuid({ message: 'Selecione uma Clinica' }).optional(),
  code: z.string().min(1, { message: 'Campo obrigatório!' }),
  room: z.string().min(1, { message: 'Campo obrigatório!' }),
  description: z.string().optional()
})

const paramsRoomSchema = z.object({ params })
const createRoomSchema = z.object({ body })
const updateRoomSchema = z.object({ params, body })

export { createRoomSchema, paramsRoomSchema, updateRoomSchema }
