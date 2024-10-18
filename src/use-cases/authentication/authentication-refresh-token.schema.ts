import * as z from 'zod'

export const authenticationRefreshTokenSchema = z.object({
  headers: z.object({
    Authorization: z.string().refine((value) => value.startsWith('Bearer '), {
      message: 'Invalid Authorization header'
    })
  })
})
