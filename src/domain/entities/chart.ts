export type Hour = {
  week: string
  workHours: number
  workHoursRecommended: number
  workHoursService: number
}

export type Chart = {
  clinicId: string
  fantasy: string
  title: string
  workHours: Hour[]
}
