import { Clinic } from '@prisma/client'

export class ClinicMapper implements Omit<Clinic, 'id'> {
  id!: string
  createdAt!: Date
  updatedAt!: Date
  deletedAt!: Date | null
  userId!: number | null
  code!: string
  fantasy!: string
  address!: []
  phones!: []

  constructor(data: any) {
    Object.assign(this, data)
  }

  map() {
    return {
      id: this.code,
      fantasy: this.fantasy,
      address: this.address,
      phones: this.phones,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt
    }
  }
}
