import vine from '@vinejs/vine'

export const WorkspaceValidator = vine.compile(
  vine.object({
    name: vine.string(),
  })
)
