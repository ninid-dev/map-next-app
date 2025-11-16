import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'secret'
const ACCESS_TOKEN_EXPIRE = '30d'

export function generateTokens (user) {
  const payload = { id: user.id, email: user.email, role: user.role }

  const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRE })

  return { accessToken }
}

export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    return decoded
  } catch (error) {
    console.log('jwt error', error)
    return null
  }
}
