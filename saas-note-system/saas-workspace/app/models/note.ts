import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import Workspace from './workspace.js'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import NoteHistory from './note_history.js'
import Tag from './tag.js'

export default class Note extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare workspace_id: number

  @column()
  declare title: string

  @column()
  declare content: string

  @column()
  declare note_type: 'public' | 'private'

  @column()
  declare is_draft: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Workspace)
  public workspace!: BelongsTo<typeof Workspace>

  @manyToMany(() => Tag, { pivotTable: 'note_tags' })
  public tags!: ManyToMany<typeof Tag>

  @hasMany(() => NoteHistory)
  public history!: HasMany<typeof NoteHistory>
}
