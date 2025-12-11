import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Note from './note.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Company from './company.js'

export default class NoteHistory extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare noteId: number

  @column()
  declare previousContent: string

  @column()
  declare changedBy: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Note)
  declare note: BelongsTo<typeof Note>

  @belongsTo(() => Company, { foreignKey: 'changedBy' })
  declare changedByCompany: BelongsTo<typeof Company>
}
