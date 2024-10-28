import { PeopleInput, PeopleOutput } from '@/domain/entities/people'

export interface PeopleRepository {
  count(...args: any): Promise<number>
  findAll(...args: any): Promise<PeopleOutput[]>
  findFirst(id: string): Promise<PeopleOutput | null>
  create(input: PeopleInput): Promise<PeopleOutput>
  update(id: string, input: PeopleInput): Promise<PeopleOutput>
  delete(id: string): Promise<void>
}
