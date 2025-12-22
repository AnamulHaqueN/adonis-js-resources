import { BaseSchema } from '@adonisjs/lucid/schema'

export default class AddVoteCountersToNotes extends BaseSchema {
  protected tableName = 'notes'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('upvotes').defaultTo(0)
      table.integer('downvotes').defaultTo(0)
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('upvotes')
      table.dropColumn('downvotes')
    })
  }
}
