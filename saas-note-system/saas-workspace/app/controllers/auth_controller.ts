import Company from '#models/company'
import User from '#models/user'
import { RegisterValidator } from '#validators/registervalidator'
import { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  // REGISTER
  public async register({ request, response, auth }: HttpContext) {
    try {
      const payload = await request.validateUsing(RegisterValidator)
      const domain = request.hostname()
      console.log(domain)
      const company = await Company.findBy('name', domain)
      if (!company) {
        return "Can't find such company"
      }

      const userData: Partial<User> = {
        name: payload.name,
        email: payload.email,
        password: payload.password,
        companyId: company.id,
        role: 'member',
      }

      const user = await User.create(userData)

      return response.created({ user })
    } catch (error) {
      console.log(error)
      return response.badRequest({ errors: error.messages || error })
    }
  }

  // LOGIN
  public async login({ request, auth, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    try {
      const user = await User.verifyCredentials(email, password)
      const token = await auth.use('api').createToken(user)

      return {
        message: 'Login successful',
        token: token,
        user: user.serialize(),
      }
    } catch (error) {
      console.log(error)
      return response.unauthorized('Invalid email or password')
    }
  }

  // LOG OUT
  public async logOut({ auth, response }: HttpContext) {
    try {
      const user = auth.user!
      await User.accessTokens.delete(user, user.currentAccessToken.identifier)
      return response.ok({
        message: 'Logged out successfully',
      })
    } catch (error) {
      return response.unauthorized('Not authenticated')
    }
  }

  // me
  public async me({ auth, response }: HttpContext) {
    try {
      const user = auth.user!
      return response.ok({
        message: 'User info fetched successfully !',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          companyId: user.companyId,
          createdAt: user.createdAt,
        },
      })
    } catch {
      return response.unauthorized({
        message: 'Not authenticated',
      })
    }
  }
}
