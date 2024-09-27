import * as z from 'zod'

export const authSchema = z.object({
  body: z.object({ email: z.string().email(), password: z.string().min(6) })
})
