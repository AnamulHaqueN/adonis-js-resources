import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Note from './note.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class NoteVote extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare noteId: number

  @column()
  declare voterUserId: number

  @column()
  declare vote: 'up' | 'down'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relation
  @belongsTo(() => Note)
  declare note: BelongsTo<typeof Note>

  @belongsTo(() => User, { foreignKey: 'voterUserId' })
  declare voter: BelongsTo<typeof User>
}
