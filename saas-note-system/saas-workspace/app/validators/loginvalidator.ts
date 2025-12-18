import vine from '@vinejs/vine'

export const LoginValidator = vine.compile(
  vine.object({
    email: vine.string().email().toLowerCase(),
    password: vine.string(),
  })
)
