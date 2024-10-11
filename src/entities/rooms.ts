import { Clinic as ClininPrisma } from '@prisma/client'
import { randomUUID } from 'crypto'

export interface ClinicInterface extends InstanceType<typeof Clinic> {}

export class Clinic implements Omit<ClininPrisma, 'deletedAt'> {
  public createdAt!: Date
  public updatedAt!: Date
  public id!: string
  public userId!: string | null
  public title!: string
  public fantasy!: string
  public cnpj!: string
  public ie!: string | null
  public phone!: string | null
  public mobilePhone!: string | null
  public address!: string | null
  public number!: string | null
  public neighborhood!: string | null
  public complement!: string | null
  public reference!: string | null
  public city!: string | null
  public state!: string | null
  public zipCode!: string | null

  constructor(
    props: Omit<Clinic, 'createdAt' | 'updatedAt' | 'deletedAt'>,
    id?: string
  ) {
    Object.assign(this, props)
    if (!id) {
      this.id = randomUUID()
    }
  }
}
