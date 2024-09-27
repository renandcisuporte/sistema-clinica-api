import * as z from 'zod'

export const schemaClinic = z.object({
  params: z.object({ id: z.string().uuid() })
})
