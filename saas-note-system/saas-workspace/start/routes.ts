/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const AuthController = () => import('#controllers/auth_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const NotesController = () => import('#controllers/notes_controller')
const WorkspacesController = () => import('#controllers/workspaces_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.post('/register', [AuthController, 'register'])
router.post('/login', [AuthController, 'login'])

router
  .group(() => {
    router.get('/me', [AuthController, 'me'])
    router.delete('/logout', [AuthController, 'logOut'])
  })
  .use(middleware.auth())

router
  .group(() => {
    router.post('', [WorkspacesController, 'store'])
    router.get('', [WorkspacesController, 'index'])
    router.put('/:id', [WorkspacesController, 'update'])
    router.delete('/:id', [WorkspacesController, 'destroy'])
  })
  .prefix('/workspaces')
  .use(middleware.auth())

router
  .group(() => {
    router.post('/notes', [NotesController, 'store'])
  })
  .use(middleware.auth())
