import vine from '@vinejs/vine'

export const CreateNoteValidator = vine.compile(
  vine.object({
    workspaceId: vine.number(),
    title: vine.string().minLength(3),
    content: vine.string().minLength(5),
    noteType: vine.string().in(['public', 'private']),
    //tags: vine.array(vine.string()).optional(),
  })
)
