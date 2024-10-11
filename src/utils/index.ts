import { compareSync, genSaltSync, hashSync } from 'bcryptjs'
import { sign, verify } from 'jsonwebtoken'

export function hashPass(password: string): string {
  const salt = genSaltSync(10)
  return hashSync(password, salt)
}
export function verifyPass(password: string, hashPass: string): boolean {
  return compareSync(password, hashPass)
}

export function hashJwt(input: any, expiresIn = '1h') {
  return sign(input, process.env.SUPER_SECRETS!, { expiresIn })
}

export function verifyJwt(input: any): any {
  return verify(input, process.env.SUPER_SECRETS!)
}

export function formatErrors(errors: any[]) {
  const formattedErrors: any = {}

  errors.forEach((error) => {
    // Pegue o último valor do caminho (neste caso, 'ie')
    const field = error.path[error.path.length - 1]
    // Adicione a chave com a mensagem no objeto resultante
    formattedErrors[field] = error.message
  })

  return formattedErrors
}
