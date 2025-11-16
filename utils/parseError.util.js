export function parseError(error) {
  if (!error) return 'Unknown error'

  const name = error.constructor?.name

  // 🔹 Prisma validation error
  if (name === 'PrismaClientValidationError') {
    const lines = error.message.split('\n')
    const found = lines.find(line =>
      line.trim().startsWith('Argument') ||
      line.trim().startsWith('Unknown') ||
      line.trim().startsWith('Invalid')
    )
    return found?.trim() || 'Invalid data for Prisma model'
  }

  // 🔹 Prisma known request error
  if (name === 'PrismaClientKnownRequestError') {
    if (error.code === 'P2002') return 'Duplicate unique field value'
    if (error.code === 'P2025') return 'Record not found'
    return error.message
  }

  // 🔹 JWT / Auth
  if (error.name === 'JsonWebTokenError') return 'Invalid token'
  if (error.name === 'TokenExpiredError') return 'Token has expired'
  if (error.name === 'UnauthorizedError') return 'Unauthorized access'

  // 🔹 Axios
  if (error.isAxiosError) return error.response?.data?.message || error.message

  // 🔹 General
  if (error instanceof Error) return error.message

  return typeof error === 'string' ? error : 'Unexpected error occurred'
}
