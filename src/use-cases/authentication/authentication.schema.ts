import * as z from 'zod'

export const authenticationSchema = z.object({
  body: z.object({ email: z.string().email(), password: z.string().min(6) })
})
