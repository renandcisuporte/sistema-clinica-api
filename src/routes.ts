import { Application } from 'express'
import { routerClinics } from './modules/clinics/routes'

export function RegisterRoutes(app: Application) {
  app.use('/clinics', routerClinics)
}
