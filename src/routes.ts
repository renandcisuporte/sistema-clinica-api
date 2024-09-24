import app from './application'
import { routerClinics } from './modules/clinics/routes'

app.use('/clinics', routerClinics)
