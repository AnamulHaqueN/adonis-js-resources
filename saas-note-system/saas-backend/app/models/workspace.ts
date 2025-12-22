import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import Company from './company.js'
import Note from './note.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'

export default class Workspace extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  public companyId!: number

  @column()
  public userId!: number

  @column()
  public name!: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Company, { foreignKey: 'companyId' })
  public company!: BelongsTo<typeof Company>

  @belongsTo(() => User, { foreignKey: 'userId' })
  public user!: BelongsTo<typeof User>

  @hasMany(() => Note, { foreignKey: 'workspaceId' })
  public notes!: HasMany<typeof Note>
  static save: any
}
