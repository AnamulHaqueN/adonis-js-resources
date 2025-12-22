import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'note_votes'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.unique(['note_id', 'voter_user_id'])
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropUnique(['note_id', 'voter_user_id'])
    })
  }
}
