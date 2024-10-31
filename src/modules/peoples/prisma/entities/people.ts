import { People } from '@prisma/client'

export type PeopleInput = Omit<
  People,
  'createdAt' | 'updatedAt' | 'id' | 'dateOfBirth'
> & {
  dateOfBirth: string | null
}

export type PeopleOutput = Omit<People, 'deletedAt' | 'dateOfBirth'> & {
  dateOfBirth: string | null
}
