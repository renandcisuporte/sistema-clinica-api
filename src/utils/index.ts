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
  return sign(input, input.id, { expiresIn })
}

export function verifyJwt(input: any) {
  return verify({ ...input }, input.id)
}
