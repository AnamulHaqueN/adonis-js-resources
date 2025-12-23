import Note from '#models/note'
import NoteVote from '#models/note_vote'
import db from '@adonisjs/lucid/services/db'
import type { HttpContext } from '@adonisjs/core/http'

export default class NoteVotesController {
  public async vote({ auth, params, request, response }: HttpContext) {
    await auth.authenticate()
    const user = auth.user!

    const voteType = request.input('voteType') as 'up' | 'down'
    //console.log(voteType)

    if (!['up', 'down'].includes(voteType)) {
      return response.badRequest({ message: 'Invalid vote type' })
    }

    const note = await Note.find(params.noteId)
    if (!note) {
      return response.notFound({ message: 'Note not found' })
    }

    // Cannot vote own note
    if (note.userId === user.id) {
      return response.forbidden({ message: 'You cannot vote your own note' })
    }

    console.log('check note')

    await db.transaction(async (trx) => {
      note.useTransaction(trx)
      console.log('Transaction vote')
      const existingVote = await NoteVote.query({ client: trx })
        .where('note_id', note.id)
        .where('voter_user_id', user.id)
        .first()

      // CREATE vote
      if (!existingVote) {
        console.log('Trigger createVotes')
        const votes = await NoteVote.create(
          {
            noteId: note.id,
            voterUserId: user.id,
            vote: voteType,
          },
          { client: trx }
        )

        if (voteType === 'up') note.upvotes++
        else note.downvotes++

        await note.save()
        await votes.save()
        return
      }

      // SAME vote → do nothing
      if (existingVote.vote === voteType) return

      // SWITCH vote
      if (existingVote.vote === 'up' && note.upvotes > 0) {
        console.log('Switch vote')
        note.upvotes--
      }

      if (existingVote.vote === 'down' && note.downvotes > 0) {
        note.downvotes--
      }

      existingVote.vote = voteType
      console.log('first')
      await existingVote.useTransaction(trx).save()

      if (voteType === 'up') note.upvotes++
      else note.downvotes++

      await note.save()
    })

    return response.ok({ message: 'Vote processed' })
  }
}
