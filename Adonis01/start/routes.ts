/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import app from '@adonisjs/core/services/app'
import router from '@adonisjs/core/services/router'
import { HttpContext } from '@adonisjs/core/http'
import fs from 'node:fs/promises'
import { Exception } from '@adonisjs/core/exceptions'
import { middleware } from './kernel.js'

router.on('/').render('pages/home').as('home')
// router.get('/movies/:slug', async ({ params }) => {
//   return params.slug
// })

router
  .get('/movies/:slug', async (ctx: HttpContext) => {
    const url = app.makeURL(`resources/movies/${ctx.params.slug}.md`)
    try {
      const movie = await fs.readFile(url, 'utf-8')
      ctx.view.share({ movie })
    } catch (error) {
      throw new Exception(`Could not find a movie called ${ctx.params.slug}`, {
        code: 'E_NOT_FOUND',
        status: 404,
      })
    }
    return ctx.view.render('pages/movies/show')
  })
  .as('movies.show')
  .where('slug', router.matchers.slug())
// .where('slug', /^[a-zA-Z0-9_-]+$/)

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

// router.get('/movies', () => {}).as('movies.index')
// router.get('/movies/my-awesome-movie', () => {}).as('movies.show')
// router.get('movies/create', () => {}).as('movies.store')
// router.post('/movies', () => {}).as('movies.store')
// router.get('movies/my-awsome-movie/edit', () => {}).as('movies.update')
// router.put('movies/my-awsome-movie', () => {}).as('movies.update')
// router.delete('/movies/my-awsome-movie', () => {}).as('movies.destroy')

router.get('/anam', async ({ request }) => {
  console.log(request.types())
  return {
    ip: request.types(),
  }
})
