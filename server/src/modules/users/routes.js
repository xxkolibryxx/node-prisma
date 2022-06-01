import { Router } from 'express'
import { validate } from '../../helpers/common.js'
import { getAllUsers, getUser, createUsers } from './services.js'
import validations from './validations.js'

const { getUserByIdSchema, createUsersSchema } = validations

const router = Router()

router.get('/', getAllUsers)
router.get('/:UserId', validate(getUserByIdSchema), getUser)
router.post('/createMany', validate(createUsersSchema), createUsers)
// router.get('/', validate(createUserSchema), createUser)

export { router as UserRoutes }
