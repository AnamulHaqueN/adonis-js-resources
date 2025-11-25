/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { HttpContext } from '@adonisjs/core/http'

router.on('/').render('pages/home')

// router.on('/movies').render('pages/movie')

router.get('/movies', async (ctx: HttpContext) => {
  ctx.view.share({ movie: 'My Awesome Movie!' }) // we can share the value like this and received in movie.edge
  return ctx.view.render('pages/movie', { new_movie: 'Is this new move ?' }) // render directly movie.edge
})

router.get('/movies/:id/:name', async (ctx: HttpContext) => {
  const params = ctx.params
  const id = ctx.params.id // provide the id
  const name = ctx.params.name // provide the name
  const url = ctx.request.url() // provide complete url: `/movies/101/anamul`
  return {
    id,
    name,
    url,
    params,
  }
})

router.post('/movies', async ({ request }) => {
  const data = request.only(['id', 'name'])
  console.log(data)
  return data
})
