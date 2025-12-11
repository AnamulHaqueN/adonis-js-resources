import Company from '#models/company'
import Workspace from '#models/workspace'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { faker } from '@faker-js/faker'

export default class WorkspaceSeeder extends BaseSeeder {
  public async run() {
    const companies = await Company.all()
    for (const company of companies) {
      for (let i = 0; i < 2; i++) {
        await Workspace.create({
          name: faker.company.name(),
          companyId: company.id,
        })
      }
    }
  }
}
