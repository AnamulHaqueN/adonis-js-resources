import Note from '#models/note'
import NoteVote from '#models/note_vote'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class NoteVotesController {
  public async vote({ auth, params, request, response }: HttpContext) {
    await auth.authenticate()
    const user = auth.user!

    const voteType = request.input('vote') // 'up' | 'down'
    const noteId = params.id

    if (!['up', 'down'].includes(voteType)) {
      return response.badRequest({ message: 'Invalid vote type' })
    }

    const trx = await db.transaction()

    try {
      const note = await Note.findOrFail(noteId, { client: trx })

      // Creator cannot vote
      if (note.userId === user.id) {
        await trx.rollback()
        return response.forbidden({ message: 'You cannot vote your own note' })
      }

      const existingVote = await NoteVote.query({ client: trx })
        .where('note_id', note.id)
        .andWhere('voter_user_id', user.id)
        .first()

      if (existingVote) {
        // Vote changed
        if (existingVote.vote !== voteType) {
          if (existingVote.vote === 'up') {
            await Note.query({ client: trx })
              .where('id', note.id)
              .decrement('upvotes', 1)
          } else {
            await Note.query({ client: trx })
              .where('id', note.id)
              .decrement('downvotes', 1)
          }

          if (voteType === 'up') {
            await Note.query({ client: trx })
              .where('id', note.id)
              .increment('upvotes', 1)
          } else {
            await Note.query({ client: trx })
              .where('id', note.id)
              .increment('downvotes', 1)
          }

          existingVote.vote = voteType
          await existingVote.useTransaction(trx).save()
        }
      } else {
        // New vote
        await NoteVote.create(
          {
            noteId: note.id,
            voterUserId: user.id,
            vote: voteType,
          },
          { client: trx }
        )
      }

      await trx.commit()
      return response.ok({ message: 'Vote counted successfully' })
    } catch (error) {
      await trx.rollback()
      return response.internalServerError({ message: 'Something went wrong' })
    }
  }
}

