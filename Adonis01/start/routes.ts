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

router.on('/').render('pages/home').as('home')
// router.get('/movies/:slug', async ({ params }) => {
//   return params.slug
// })

router
  .get('/movies/:slug', async (ctx: HttpContext) => {
    const url = app.makeURL(`resources/movies/${ctx.params.slug}.html`)
    const movie = await fs.readFile(url, 'utf-8')
    return ctx.view.render('pages/movies/show', { movie })
  })
  .as('movies.show')

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
