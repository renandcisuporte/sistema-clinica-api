export type Hour = {
  week: string
  workTime: number
  workTimeRecommend: number
  workTimeService: number
  dailyProcedure?: number
  dailyIdleProcedure?: number
}

export type Chart = {
  clinicId: string
  fantasy: string
  title: string
  workHours: Hour[]
}
