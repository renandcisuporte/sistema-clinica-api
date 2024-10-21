import { randomUUID } from 'crypto'

export interface AuthenticationInterface
  extends Awaited<
    Omit<
      Authentication,
      | 'passwordVerify'
      | 'refreshToken'
      | 'token'
      | 'deletedAt'
      | 'createdAt'
      | 'updatedAt'
    >
  > {}

export class Authentication {
  public readonly id!: string
  public createdAt!: Date
  public updatedAt!: Date
  public deletedAt!: Date | null
  public fullName!: string
  public email!: string
  public password!: string
  public passwordVerify!: Boolean
  public token!: string
  public refreshToken!: string
  public admin!: string

  constructor(
    props: Omit<Authentication, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
    id?: string
  ) {
    Object.assign(this, props)
    if (!id) {
      this.id = randomUUID()
    }
  }
}
