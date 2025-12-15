import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  // REGISTER
  async register({ request, response }: HttpContext) {
    const data = request.only(['email', 'password'])

    const user = await User.create(data)

    return response.created({
      message: 'User registered successfully',
      user,
    })
  }

  // LOGIN
  async login({ auth, request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    try {
      const user = await User.verifyCredentials(email, password)
      const token = await auth.use('api').createToken(user)

      return {
        token: token,
        user,
      }
    } catch {
      return response.unauthorized('Invalid email or password')
    }
  }

  // GET USER PROFILE
  async me({ auth }: HttpContext) {
    return auth.user
  }
}
