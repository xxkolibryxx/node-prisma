import { Router } from 'express'
import { companiesRoutes } from '../modules/companies/routes.js'
import { UserRoutes } from '../modules/users/routes.js'
import { RoleRoutes } from '../modules/roles/routes.js'

const router = Router()

router.use('/companies', companiesRoutes)
router.use('/users', UserRoutes)
router.use('/roles', RoleRoutes)

export { router as v1 }
