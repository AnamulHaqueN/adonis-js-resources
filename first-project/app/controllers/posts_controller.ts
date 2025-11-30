import { PostValidator } from '#validators/post'
import type { HttpContext } from '@adonisjs/core/http'

export default class PostsController {
  async store({ request, auth, session, response }: HttpContext) {
    const { content } = await request.validateUsing(PostValidator)

    // await Post.create({
    //     content,
    //     userId: auth.user!.id,
    // })

    await auth.user!.related('posts').create({ content })

    session.flash({
      notification: {
        type: 'success',
        message: 'Post created.',
      },
    })

    return response.redirect().back()
  }
}
