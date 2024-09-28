import prisma from '@/database/prisma'
import { CreateUserController } from '@/modules/users/controller/create-user.controller'
import { FindAllUserController } from '@/modules/users/controller/find-all-user.controller'
import { FindFirstUserController } from '@/modules/users/controller/find-firts-user.controller'
import { UserRepository } from '@/modules/users/repositories/prisma/user-repository.prisma'
import { CreateUserUseCase } from '@/modules/users/use-cases/create-user.use-case'
import { FindAllUserUseCase } from '@/modules/users/use-cases/find-all-user.use-case'
import { FindFirstUserUseCase } from '@/modules/users/use-cases/find-first-user.use-case'
import { Router } from 'express'

const routerUser = Router()

const repositoryUser = new UserRepository(prisma)
const createUser = new CreateUserController(
  new CreateUserUseCase(repositoryUser)
)

const findAllUser = new FindAllUserController(
  new FindAllUserUseCase(repositoryUser)
)

const findFirstUser = new FindFirstUserController(
  new FindFirstUserUseCase(repositoryUser)
)

routerUser
  .post('/', (req, rep) => createUser.handle(req, rep))
  .get('/:id', (req, rep) => findFirstUser.handle(req, rep))
  .get('/', (req, rep) => findAllUser.handle(req, rep))

export { routerUser }
