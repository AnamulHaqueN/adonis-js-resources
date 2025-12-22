// eslint-disable-next-line @unicorn/filename-case
import vine from '@vinejs/vine'

export const paginationValidator = vine.compile(
  vine.object({
    page: vine.number().min(1).optional(),
    limit: vine.number().min(1).max(20).optional(),
    sortBy: vine.enum(['createdAt', 'name', 'title'] as const).optional(),
    orderBy: vine.enum(['asc', 'desc'] as const).optional(),
  })
)
