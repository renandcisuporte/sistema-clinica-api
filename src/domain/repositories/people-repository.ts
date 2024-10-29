import { PeopleInput, PeopleOutput } from '@/domain/entities/people'
import { PeopleRepository } from '@/domain/inferfaces/repositories/people-repository'
import { dateFormated } from '@/shared/utils'
import { PrismaClient } from '@prisma/client'

export class PeopleRepositoryImp implements PeopleRepository {
  constructor(protected readonly db: PrismaClient) {}

  async delete(id: string): Promise<void> {
    await this.db.people.update({
      where: { deletedAt: null, id },
      data: { deletedAt: new Date() }
    })
  }

  async update(_id: string, input: PeopleInput): Promise<PeopleOutput> {
    const { clinicId, phones, dateOfBirth, type, ...restInput } = input

    const result = await this.db.people.update({
      where: { id: _id, deletedAt: null },
      data: {
        ...restInput,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        phones: JSON.stringify(phones)
      }
    })

    const { deletedAt, ...rest } = result
    return { ...rest, phones, dateOfBirth }
  }

  async create(input: PeopleInput): Promise<PeopleOutput> {
    const { phones, dateOfBirth, type, ...restInput } = input

    const result = await this.db.people.create({
      data: {
        ...restInput,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
        phones: JSON.stringify(phones)
      }
    })

    const { deletedAt, ...rest } = result
    return {
      ...rest,
      phones,
      dateOfBirth: dateOfBirth && dateFormated(dateOfBirth)
    }
  }

  async findFirst(id: string): Promise<PeopleOutput | null> {
    const response = await this.db.people.findUnique({
      where: { id, deletedAt: null }
    })

    if (!response) return null

    const { deletedAt, dateOfBirth, ...rest } = response
    rest.phones = JSON.parse(`${rest.phones}`)
    return {
      ...rest,
      dateOfBirth: dateOfBirth && dateFormated(dateOfBirth)
    }
  }

  async activeInative(id: string): Promise<void> {
    const response = await this.db.people.findUnique({
      where: { id, deletedAt: null },
      select: { type: true }
    })

    await this.db.people.update({
      where: { id, deletedAt: null },
      data: { type: response?.type === 'user' ? 'specialist' : 'user' }
    })
  }

  async count(args: Record<string, any>): Promise<number> {
    const { full_name, document, clinicId, type } = args

    const where: Record<string, any> = { deletedAt: null, clinicId }
    if (type) where.type = type

    const conditions: Record<string, any> = []
    if (full_name) conditions.push({ fullName: { contains: full_name } })

    if (document) conditions.push({ document: { contains: document } })

    if (conditions.length > 0) Object.assign(where, { OR: conditions })

    return await this.db.people.count({
      where: { ...where }
    })
  }

  async findAll(args: Record<string, any>): Promise<PeopleOutput[]> {
    const { full_name, document, clinicId, type, limit = 15, page = 1 } = args

    const where: Record<string, any> = { deletedAt: null, clinicId, type }
    if (type) where.type = type

    const conditions: Record<string, any> = []
    if (full_name) conditions.push({ fullName: { contains: full_name } })

    if (document) conditions.push({ document: { contains: document } })

    if (conditions.length > 0) Object.assign(where, { OR: conditions })

    const result = await this.db.people.findMany({
      where: { ...where },
      skip: (+page - 1) * +limit,
      take: +limit,
      orderBy: {
        fullName: 'desc'
      }
    })

    return result.map(({ deletedAt, dateOfBirth, ...rest }) => {
      rest.phones = JSON.parse(`${rest.phones}`)
      return {
        ...rest,
        dateOfBirth: dateOfBirth && dateFormated(dateOfBirth)
      }
    })
  }
}
