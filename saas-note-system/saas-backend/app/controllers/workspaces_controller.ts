import Workspace from '#models/workspace'
import { WorkspaceValidator } from '#validators/workspacevalidator'
import type { HttpContext } from '@adonisjs/core/http'

export default class WorkspacesController {
  // Create workspaces any login user can create
  public async store({ auth, request, response }: HttpContext) {
    try {
      const user = auth.user!
      const payload = await request.validateUsing(WorkspaceValidator)

      const workspace = await Workspace.create({
        name: payload.name,
        companyId: user.companyId,
        userId: user.id,
      })

      return response.created({
        message: 'Workspace created',
        workspace,
      })
    } catch (error) {
      //console.log(error)
      return response.badRequest({ errors: error.messages || error })
    }
  }

  // List workspaces for user's company
  public async index({ auth, response }: HttpContext) {
    try {
      const user = auth.user!
      const workspaces = await Workspace.query().where('company_id', user.companyId)
      if (workspaces.length) {
        return {
          message: 'List of Workspaces',
          workspaces,
        }
      } else {
        return {
          message: 'There is no workspace in your company',
        }
      }
    } catch (error) {
      return response.unauthorized('Not authenticated.')
    }
  }

  // Update workspace - only creator OR company owner can update

  public async update({ auth, request, params, response }: HttpContext) {
    try {
      const user = auth.user!

      const workspace = await Workspace.find(params.id)
      if (!workspace) return response.notFound('Workspace not Found')

      // --- Permission Check ---

      const isCreator = workspace.userId === user.id
      const isOwner = user.role === 'owner'

      if (!isCreator && !isOwner) {
        return response.forbidden('You are not allow to update this workspace')
      }

      const payload = await request.validateUsing(WorkspaceValidator)
      workspace.merge(payload)
      await workspace.save()

      return response.ok({
        message: 'Workspace updated',
        workspace,
      })
    } catch (error) {
      //console.log(error)
      return response.badRequest({ errors: error.messages || error })
    }
  }

  // Delete workspace - only creator OR company owner can delete
  public async destroy({ auth, params, response }: HttpContext) {
    try {
      const user = auth.user!
      const workspace = await Workspace.find(params.id)
      if (!workspace) return response.notFound('Workspace not Found !')

      // --- Permission Check ---
      const isCreator = user.id === workspace.userId
      const isOwner = user.role === 'owner'
      if (!isCreator && !isOwner) {
        return response.forbidden('You are not Permitted to delete this workspace')
      }

      await workspace.delete()

      return response.ok({
        message: 'Workspace deleted successfully.',
      })
    } catch (error) {
      return response.unauthorized('Not authenticated')
    }
  }
}
