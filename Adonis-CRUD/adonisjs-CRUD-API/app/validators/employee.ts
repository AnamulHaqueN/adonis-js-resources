import vine from '@vinejs/vine'
export const EmployeeValidator = vine.compile(
  vine.object({
    name: vine.string(),
    email: vine
      .string()
      .email()
      .unique(async (db, value) => {
        const result = await db.from('employees').select('email').where('email', value).first()
        return result ? false : true
      }),
  })
)

export const EmployeeUpdateValidator = vine.compile(
  vine.object({
    name: vine.string().optional(),
    email: vine.string().email().optional(),
  })
)
