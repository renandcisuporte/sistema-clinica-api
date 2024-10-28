import { z } from 'zod'

const params = z.object({
  id: z.string().uuid({ message: 'Campo deve ser um UUID' })
})

const phoneSchema = z.object({
  phone: z.string().optional(),
  description: z.string().optional()
})

const body = z.object({
  fullName: z.string({ message: 'Campo fullName obrigatório!' }).min(5),
  document: z.string({ message: 'Campo document obrigatório!' }).optional(),
  dateOfBirth: z
    .string({ message: 'Campo dateOfBirth obrigatório!' })
    .transform((string) => new Date(string).toDateString())
    .optional(),
  phones: z.array(phoneSchema).optional(),
  email: z.string({ message: 'campo email obrigatório!' }).optional(),
  address: z.optional(z.string()),
  number: z.optional(z.string()),
  neighborhood: z.optional(z.string()),
  complement: z.optional(z.string()),
  reference: z.optional(z.string()),
  city: z.optional(z.string()),
  state: z.optional(z.string()),
  zipCode: z.optional(z.string())
})

const paramIdPeopleSchema = z.object({ params })
const createPeopleSchema = z.object({ body })
const updatePeopleSchema = z.object({ params, body })

export { createPeopleSchema, paramIdPeopleSchema, updatePeopleSchema }
