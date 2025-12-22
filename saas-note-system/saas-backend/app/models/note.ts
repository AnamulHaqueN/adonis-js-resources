import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import Workspace from './workspace.js'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import NoteHistory from './note_history.js'
import Tag from './tag.js'
import User from './user.js'
import type { NoteType } from '../types/note.js'
import NoteVote from './note_vote.js'

export default class Note extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'workspace_id' })
  declare workspaceId: number

  @column()
  declare userId: number

  @column()
  declare title: string

  @column()
  declare content: string

  @column({ columnName: 'note_type' })
  declare noteType: NoteType

  @column({ columnName: 'is_draft' })
  declare isDraft: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relations
  @belongsTo(() => Workspace, { foreignKey: 'workspaceId' })
  declare workspace: BelongsTo<typeof Workspace>

  @belongsTo(() => User, { foreignKey: 'userId' })
  declare creator: BelongsTo<typeof User>

  @manyToMany(() => Tag, { pivotTable: 'note_tags' })
  public tags!: ManyToMany<typeof Tag>

  @hasMany(() => NoteVote)
  public votes!: HasMany<typeof NoteVote>

  @hasMany(() => NoteHistory)
  public history!: HasMany<typeof NoteHistory>
}
