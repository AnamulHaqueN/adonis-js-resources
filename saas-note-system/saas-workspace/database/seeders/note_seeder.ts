import Note from '#models/note'
import User from '#models/user'
import Workspace from '#models/workspace'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { faker } from '@faker-js/faker'

export default class NoteSeeder extends BaseSeeder {
  public async run() {
    const workspaces = await Workspace.all()
    const users = await User.all()

    for (const workspace of workspaces) {
      for (let i = 0; i < 3; i++) {
        const user = users[Math.floor(Math.random() * users.length)]
        await Note.create({
          title: faker.lorem.sentence(),
          content: faker.lorem.paragraph(),
          note_type: Math.random() > 0.5 ? 'public' : 'private',
          is_draft: Math.random() > 0.7,
          workspace_id: workspace.id,
          userId: user.id,
        })
      }
    }
  }
}
