import Note from '#models/note'
import Workspace from '#models/workspace'
import { CreateNoteValidator } from '#validators/create_note'
import { HttpContext } from '@adonisjs/core/http'
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

  // SHOW single note
  public async show({ params, auth, response }: HttpContext) {
    try {
      const note = await Note.query()
        .where('id', params.id)
        .preload('creator')
        .preload('tags')
        .first()

      if (!note) {
        return response.notFound({ message: 'Note not found' })
      }

      // Optional: restrict private notes later
      return response.ok(note.serialize())
    } catch (error) {
      console.log(error)
      return response.unauthorized('Invalid Credentials')
    }
  }

  // Show list of Notes in a company based on user login
  public async list({ auth, response }: HttpContext) {
    try {
      await auth.authenticate()
      const user = auth.user!

      const notes = await Note.query()
        .whereHas('workspace', (workspaceQuery) => {
          workspaceQuery.where('company_id', user.companyId)
        })
        .preload('workspace')
        .preload('creator')
        .preload('tags')

      return response.ok({
        message: notes.length ? 'List of Notes' : 'Notes is empty',
        notes: notes.map((note) => note.serialize()),
      })
    } catch (error) {
      console.log(error)
      return response.unauthorized({ message: 'Please login first' })
    }
  }

  // UPDATE note (only creator)
  public async update({ params, request, auth, response }: HttpContext) {
    try {
      const user = auth.user!

      const note = await Note.find(params.id)
      if (!note) {
        return response.notFound({ message: 'Note not found' })
      }

      // Permission check
      if (note.userId !== user.id) {
        return response.forbidden({ message: 'You cannot edit this note' })
      }

      note.merge(request.only(['title', 'content', 'noteType', 'isDraft']))
      await note.save()

      return response.ok({
        message: 'Note updated',
        note: note.serialize(),
      })
    } catch (error) {
      console.log(error)
      return response.unauthorized('Invalid credentials')
    }
  }

  // Delete Note (only creator)
  public async destroy({ params, auth, response }: HttpContext) {
    try {
      const user = auth.user!
      const note = await Note.find(params.id)
      if (!note) {
        return response.notFound({ message: 'Note is not found !' })
      }

      // check permission to delete a note
      if (user.id !== note.userId) {
        return response.forbidden({ message: 'You are not permitted to delete this note' })
      }

      note.delete()

      return {
        message: 'Note is deleted successfully',
      }
    } catch (error) {
      console.log(error)
      return response.unauthorized('Invalid credentials')
    }
  }
}
