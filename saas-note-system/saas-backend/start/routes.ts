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
const NoteVotesController = () => import('#controllers/note_votes_controller')
const NotesController = () => import('#controllers/notes_controller')
const WorkspacesController = () => import('#controllers/workspaces_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.post('/register', [AuthController, 'register'])
router.post('/login', [AuthController, 'login'])

// All auth router
router
  .group(() => {
    router.get('/me', [AuthController, 'me'])
    router.delete('/logout', [AuthController, 'logOut'])
  })
  .use(middleware.auth())

// All Workspace router
router
  .group(() => {
    router.post('', [WorkspacesController, 'store'])
    router.get('', [WorkspacesController, 'index'])
    router.put('/:id', [WorkspacesController, 'update'])
    router.delete('/:id', [WorkspacesController, 'destroy'])
  })
  .prefix('/workspaces')
  .use(middleware.auth())

// All Notes router
router
  .group(() => {
    router.post('/notes', [NotesController, 'store'])
    router.get('/notes', [NotesController, 'list'])
    router.get('/notes/:id', [NotesController, 'show'])
    router.put('/notes/:id', [NotesController, 'update'])
    router.delete('/notes/:id', [NotesController, 'destroy'])
  })
  .use(middleware.auth())

// Votes count
router.post('/notes/:id/vote', [NoteVotesController, 'vote']).use(middleware.auth())
