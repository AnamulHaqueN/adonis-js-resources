/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const EmployeesController = () => import('#controllers/employees_controller')
const AuthController = () => import('#controllers/auth_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.resource('employees', EmployeesController)

router.post('/register', [AuthController, 'register'])
router.post('/login', [AuthController, 'login'])

router.get('/me', [AuthController, 'me']).use(middleware.auth())
