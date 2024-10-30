import { createTransport } from 'nodemailer'

export const mail = createTransport({
  host: process.env.MAILHOG_HOST,
  port: 1025,
  auth: null,
  ignoreTLS: true,
  secure: false
} as any)
