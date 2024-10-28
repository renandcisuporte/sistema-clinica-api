import { compareSync, genSaltSync, hashSync } from 'bcryptjs'
import { format as dateFormat } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { sign, verify } from 'jsonwebtoken'

export function dateFormated(str: Date | string, time = false): string {
  if (time) return dateFormat(str, 'yyyy-MM-dd HH:mm:ss', { locale: ptBR })

  return dateFormat(str, 'yyyy-MM-dd', { locale: ptBR })
}

export function timeToMinutes(time: string) {
  const [hours, minutes] = time.split(':')
  return parseInt(hours) * 60 + parseInt(minutes)
}

export function calculateTotalHours(
  times: Record<string, any>[],
  open: boolean
): number {
  if (open) return 0

  let openMinute = 0
  let closedMinute = 0
  let totalMinutes = 0
  times.forEach(({ description, time }: any) => {
    if (description === 'Abre à(s)') openMinute = timeToMinutes(time)
    if (description === 'Fecha à(s)') closedMinute = timeToMinutes(time)
    if (openMinute && closedMinute) {
      totalMinutes += closedMinute - openMinute
    }
  })

  // Converte o total de minutos em horas
  return totalMinutes / 60
}

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

export function codeClinicId() {
  let code = ''
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  // Gerar os primeiros 3 caracteres
  for (let i = 0; i < 9; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }

  return code.replace(/(.{3})(?=.)/g, '$1-')
}
