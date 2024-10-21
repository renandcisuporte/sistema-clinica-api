declare namespace Express {
  export interface Request {
    clinicId: string
    user: {
      id: string
      admin: string
      roles?: string[]
    }
  }
}
