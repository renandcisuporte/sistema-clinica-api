import { Clinic, PrismaClient } from '@prisma/client'
import { ClinicsRepositoryInterface } from '../clinics-interface.repository'

export class ClinicsRepository implements ClinicsRepositoryInterface {
  constructor(protected readonly database: PrismaClient) {}

  async findFirst(code: string): Promise<any> {
    return await this.database.clinic.findFirst({ where: { code } })
  }

  async findAll(): Promise<Clinic[]> {
    return await this.database.clinic.findMany()
  }
}
