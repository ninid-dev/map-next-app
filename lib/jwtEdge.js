import { jwtVerify } from 'jose'

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'secret')

export async function verifyTokenEdge (token) {
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload
  } catch (error) {
    console.log('jwt edge error:', error)
    return null
  }
}
