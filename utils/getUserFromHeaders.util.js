export function getUserFromHeaders (req) {
  const userId = req.headers.get('x-user-id') || null
  const role = req.headers.get('x-user-role') || null

  return { userId, role }
}
