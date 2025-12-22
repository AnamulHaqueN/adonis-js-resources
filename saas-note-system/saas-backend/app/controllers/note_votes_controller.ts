import Note from '#models/note'
import NoteVote from '#models/note_vote'
import type { HttpContext } from '@adonisjs/core/http'

export default class NoteVotesController {
  public async vote({ auth, params, request, response }: HttpContext) {
    const user = auth.user!
    const noteId = params.id

    const { vote } = request.only(['vote']) // 'up' | 'down'

    const note = await Note.query().where('id', noteId).preload('workspace').first()

    if (!note) {
      return response.notFound({ message: 'Note not found' })
    }

    // Must be public
    if (note.noteType !== 'public') {
      return response.forbidden({ message: 'Private notes cannot be voted' })
    }

    // Same company check
    if (note.workspace.companyId !== user.companyId) {
      return response.forbidden({ message: 'Unauthorized access' })
    }

    // Creator cannot vote
    if (note.userId === user.id) {
      return response.forbidden({ message: 'You cannot vote on your own note' })
    }

    // check existing vote
    const existingVote = await NoteVote.query()
      .where('note_id', note.id)
      .where('voter_user_id', user.id)
      .first()

    if (existingVote) {
      // update Vote
      existingVote.vote = vote
      await existingVote.save()

      return response.ok({
        message: 'Vote updated',
        vote: existingVote.vote,
      })
    }

    // Create new vote
    await NoteVote.create({
      noteId: note.id,
      voterUserId: user.id,
      vote,
    })

    return response.created({
      message: 'Vote recorded',
      vote,
    })
  }
}
