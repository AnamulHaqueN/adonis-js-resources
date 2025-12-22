import vine from '@vinejs/vine'

export const CreateNoteValidator = vine.compile(
  vine.object({
    workspaceId: vine.number().exists({ table: 'workspaces', column: 'id' }),
    title: vine.string().minLength(3),
    content: vine.string().minLength(5),
    noteType: vine.enum(['public', 'private']),
    //tags: vine.array(vine.string()).optional(),
  })
)

export const UpdateNoteValidator = vine.compile(
  vine.object({
    workspaceId: vine.number().exists({ table: 'workspaces', column: 'id' }).optional(),
    title: vine.string().minLength(3).maxLength(50).optional(),
    content: vine.string().minLength(5).maxLength(200).optional(),
    noteType: vine.enum(['public', 'private']),
  })
)
