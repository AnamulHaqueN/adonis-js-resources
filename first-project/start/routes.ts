/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const RegisterController = () => import('#controllers/register_controller')
const AuthController = () => import('#controllers/auth_controller')
const PostsController = () => import('#controllers/posts_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const PostLikesController = () => import('#controllers/post_likes_controller')
const FeedController = () => import('#controllers/feed_controller')

router.get('/', [FeedController, 'index'])

router.get('register', [RegisterController, 'create'])
router.post('register', [RegisterController, 'store'])

router.get('login', [AuthController, 'create'])
router.post('login', [AuthController, 'store'])

router
  .group(() => {
    // for post
    router.post('posts', [PostsController, 'store'])

    router.get('posts/:id/edit', [PostsController, 'edit'])

    router.patch('posts/:id', [PostsController, 'update'])

    router.delete('posts/:id', [PostsController, 'destroy'])

    router.post('posts/:id/likes', [PostLikesController, 'store'])

    router.delete('logout', [AuthController, 'destroy'])
  })
  .middleware(middleware.auth())

// Test Routes

router.get('/posts/:id/comment/:comments_id', ({ params }) => {
  console.log('post id', params.id)
  console.log('comments id', params.comments_id)
  return {
    id: params.id,
    c_id: params.comments_id,
  }
})

router
  .get('/posts/:id', ({ params }) => {
    return {
      id: params.id,
    }
  })
  .where('id', router.matchers.number())

// if post id is available show post id. Else show all posts.
// ? means optional
router.get('/posts/:id?', ({ params }) => {
  if (!params) {
    return 'show all posts'
  }
  return `Show the post id: ${params.id}`
})
