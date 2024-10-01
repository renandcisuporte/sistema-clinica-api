import { randomUUID } from 'crypto'

export interface ClinicInterface extends InstanceType<typeof Clinic> {}

export class Clinic {
  public readonly id!: string
  public createdAt!: Date
  public updatedAt!: Date
  public deletedAt!: Date | null
  public userId!: string | null
  public title!: string
  public fantasy!: string
  public cnpj!: string
  public ie!: string
  public phones!: any
  public address!: any

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
