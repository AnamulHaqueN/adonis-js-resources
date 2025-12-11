import hash from '@adonisjs/core/services/hash'
import User from '#models/user'
import { RegisterValidator } from '#validators/registervalidator'
import { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  // REGISTER
  public async register({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(RegisterValidator)

      const userData = {
        name: payload.name,
        email: payload.email,
        password: payload.password,
        companyId: 1,
        role: 'member' as 'member',
      }

      const user = await User.create(userData)

      return response.created({ user })
    } catch (error) {
      console.log(error)
      return response.badRequest({ errors: error.messages || error })
    }
  }

  // LOGIN
  // public async login({ request, auth, response }: HttpContext) {
  //   const { email, password } = request.only(['email', 'password'])

  //   try {
  //     const user = await User.verifyCredentials(email, password)
  //     const token = await auth.use('api').createToken(user)

  //     return {
  //       message: 'Login successful',
  //       token: token,
  //       user: user.serialize(),
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     return response.unauthorized('Invalid email or password')
  //   }
  // }
}
