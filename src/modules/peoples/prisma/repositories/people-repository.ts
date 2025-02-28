import {
  PeopleInput,
  PeopleOutput
} from '@/modules/peoples/prisma/entities/people'

export interface PeopleRepository {
  count(...args: any): Promise<number>
  findAll(...args: any): Promise<PeopleOutput[]>
  findFirst(id: string): Promise<PeopleOutput | null>
  activeInative(id: string): Promise<void>
  create(input: PeopleInput): Promise<PeopleOutput>
  update(id: string, input: PeopleInput): Promise<PeopleOutput>
  delete(id: string): Promise<void>
}
