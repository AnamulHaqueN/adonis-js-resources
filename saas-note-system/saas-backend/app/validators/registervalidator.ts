import vine from '@vinejs/vine'

export const RegisterValidator = vine.compile(
  vine.object({
    name: vine.string(),
    email: vine
      .string()
      .email()
      .toLowerCase()
      .unique(async (db, value) => {
        const existing = await db.from('users').where('email', value).first()
        return existing ? false : true
      }),
    password: vine.string().confirmed({ confirmationField: 'confirmPassword' }),
    confirmPassword: vine.string(),
  })
)
