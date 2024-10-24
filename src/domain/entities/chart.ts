export type Hour = {
  week: string
  workHours: number
  workHoursRecommended: number
  workHoursService: number
}

export type Chart = {
  fantasy: string
  title: string
  workHours: Hour[]
}
