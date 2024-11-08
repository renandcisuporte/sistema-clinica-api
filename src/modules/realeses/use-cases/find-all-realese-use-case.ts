import { RealeseRepository } from '../prisma/repositories/realese-repository'

type Types = {
  [expenseId: string]: {
    [date: string]: { price: number }
  }
}

type Output = {
  total: number
  data: Types
}

export class FindAllRealeseUseCase implements FindAllRealeseUseCaseInterface {
  constructor(protected readonly repository: RealeseRepository) {}

  async execute(args: any): Promise<Output> {
    const { clinicId, type } = args
    console.log(type)
    const common = { clinicId, type }
    const [total, data] = await Promise.all([
      this.repository.count({ clinicId, type }),
      this.repository.all(common)
    ])

    const result: Types = {}
    for (const key in data) {
      const { date, expenseId, price, ...outhers } = data[key]
      const formattedDate = date.toISOString().split('T')[0]
      if (!result[expenseId!]) result[expenseId!] = {}
      result[expenseId!][formattedDate] = {
        price: Number(price)
      }
    }

    // Ordena as datas para cada expenseId
    for (const expenseId in result) {
      const dates = Object.keys(result[expenseId]).sort((a, b) => {
        return new Date(a).getTime() - new Date(b).getTime()
      })

      // Reorganiza as entradas em ordem de data
      result[expenseId] = dates.reduce((sorted: any, date) => {
        sorted[date] = result[expenseId][date]
        return sorted
      }, {})
    }

    return {
      total,
      data: { ...result }
    }
  }
}

export interface FindAllRealeseUseCaseInterface {
  execute(args: any): Promise<Output>
}
