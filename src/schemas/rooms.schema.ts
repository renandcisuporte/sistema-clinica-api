import { z } from 'zod'

const params = z.object({
  id: z.string().uuid({ message: 'Campo deve ser um UUID' })
})

const body = z.object({
  clinicId: z.string().uuid({ message: 'Selecione uma Clinica' }).optional(),
  room: z
    .string()
    .min(1, { message: 'Campo obrigatório!' })
    .max(18, { message: 'Máximo de 18 caracteres' }),
  description: z.string().optional()
})

const deleteOrFirstRoomSchema = z.object({ params })
const createRoomSchema = z.object({ body })
const updateRoomSchema = z.object({ params, body })

export { createRoomSchema, deleteOrFirstRoomSchema, updateRoomSchema }
