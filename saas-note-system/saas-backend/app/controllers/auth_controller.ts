import Company from '#models/company'
import User from '#models/user'
import { LoginValidator } from '#validators/loginvalidator'
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
    } catch (error: any) {
      console.log(error)
      // Vine validation errors
      if (error?.errors) {
        return response.badRequest({ errors: error.errors })
      }
      return response.badRequest({
        errors: [{ field: 'general', message: error.message || 'Registration failed' }],
      })
    }
  }

  // LOGIN
  public async login({ request, auth, response }: HttpContext) {
    const payload = await request.validateUsing(LoginValidator)

    try {
      const user = await User.verifyCredentials(payload.email, payload.password)
      const token = await auth.use('api').createToken(user)

      response.cookie('token', token.value!.release(), {
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
        path: '/',
      })
      return response.ok({
        message: 'Login successful',
        user: user,
      })
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
      await auth.authenticate()

      const user = auth.user!

      await user.load('company')

      return response.ok({
        message: 'User info fetched successfully !',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          companyId: user.companyId,
          companyName: user.company.name,
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
