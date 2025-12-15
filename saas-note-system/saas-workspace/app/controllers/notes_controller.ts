import Note from '#models/note'
import Workspace from '#models/workspace'
import { CreateNoteValidator } from '#validators/create_note'
import type { HttpContext } from '@adonisjs/core/http'
import { NoteType } from '../types/note.js'

export default class NotesController {
  public async store({ auth, request, response }: HttpContext) {
    try {
      const user = auth.user!
      const payload = await request.validateUsing(CreateNoteValidator)

      // Make sure workspace belongs to User Company
      const workspace = await Workspace.query()
        .where('id', payload.workspaceId)
        .where('company_id', user.companyId)
        .first()

      if (!workspace) {
        return response.forbidden({ message: 'Invalid workspace' })
      }

      // Create note
      const note = await Note.create({
        workspaceId: workspace.id,
        userId: user.id,
        title: payload.title,
        content: payload.content,
        noteType: payload.noteType as NoteType,
        isDraft: false,
      })

      return {
        message: 'Note created successfully',
        note,
      }
    } catch (error) {
      console.log(error)
      return response.unauthorized('Invalid email or password')
    }
  }
}
