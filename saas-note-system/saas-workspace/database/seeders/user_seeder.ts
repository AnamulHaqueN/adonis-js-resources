import Company from '#models/company'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { faker } from '@faker-js/faker'

export default class extends BaseSeeder {
  async run() {
    const companies = await Company.all()
    for (const company of companies) {
      for (let i = 0; i < 2; i++) {
        await User.create({
          name: faker.person.fullName(),
          email: faker.internet.email(),
          password: 'secret',
          role: i === 0 ? 'owner' : 'member',
          companyId: company.id,
        })
      }
    }
  }
}
