import Employee from '#models/employee'
import { EmployeeUpdateValidator, EmployeeValidator } from '#validators/employee'
import type { HttpContext } from '@adonisjs/core/http'

export default class EmployeesController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const employees = await Employee.all()
    return response.status(200).json({ data: employees })
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    try {
      const data = await request.validateUsing(EmployeeValidator)

      const employee = await Employee.create({
        name: data.name,
        email: data.email,
        mobile: request.input('mobile'),
        dob: request.input('dob'),
        doj: request.input('doj'),
        address: request.input('address'),
      })

      return response
        .status(200)
        .json({ messages: 'Employee created successfully', data: employee })
    } catch (error) {
      return response.badRequest(error.message)
    }
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const employee = await Employee.find(params.id)

    return response.status(200).json({ data: employee })
  }

  /**
   * Edit individual record
   */
  async edit({}: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const employee = await Employee.findOrFail(params.id)

    try {
      const data = await request.validateUsing(EmployeeUpdateValidator)

      employee.merge(data)

      await employee.save()
      return response
        .status(200)
        .json({ messages: 'Employee updated successfully', data: employee })
    } catch (error) {
      return response.badRequest(error.message)
    }
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const employee = await Employee.find(params.id)
      if (!employee) {
        return response.status(404).json({ type: 'error', message: 'Employee is not Found !' })
      }
      await employee.delete()

      return {
        type: 'success',
        message: 'Employee deleted successfully',
      }
    } catch (error) {
      return response.badRequest(error.message)
    }
  }
}
