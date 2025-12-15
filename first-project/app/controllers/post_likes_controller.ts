import Post from '#models/post'
import type { HttpContext } from '@adonisjs/core/http'

export default class PostLikesController {
  async store({ params, auth, response }: HttpContext) {
    const post = await Post.findOrFail(params.id)

    await auth.user!.related('likes').attach([post.id])

    return response.redirect().back()
  }
}
