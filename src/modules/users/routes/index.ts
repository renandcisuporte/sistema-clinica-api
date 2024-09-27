import prisma from '@/database/prisma'
import { UserRepository } from '@/modules/users/repositories/prisma/user-prisma'
import { CreateUserController } from '@/modules/users/use-cases/create-user/create-user.controller'
import { CreateUserUseCase } from '@/modules/users/use-cases/create-user/create-user.use-case'
import { FindAllUserController } from '@/modules/users/use-cases/find-all-user/find-all-user.controller'
import { FindAllUserUseCase } from '@/modules/users/use-cases/find-all-user/find-all-user.use-case'
import { FindFirstUserUseCase } from '@/modules/users/use-cases/find-first-user/find-first-user.use-case'
import { FindFirstUserController } from '@/modules/users/use-cases/find-first-user/find-firts-user.controller'
import { Router } from 'express'

const routerUser = Router()

const repository = new UserRepository(prisma)
const createUser = new CreateUserController(new CreateUserUseCase(repository))

const findAllUser = new FindAllUserController(
  new FindAllUserUseCase(repository)
)

const findFirstUser = new FindFirstUserController(
  new FindFirstUserUseCase(repository)
)

routerUser
  .post('/', (req, rep) => createUser.handle(req, rep))
  .get('/:id', (req, rep) => findFirstUser.handle(req, rep))
  .get('/', (req, rep) => findAllUser.handle(req, rep))

export { routerUser }
