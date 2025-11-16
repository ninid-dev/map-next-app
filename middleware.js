import { NextResponse } from 'next/server'
import { verifyTokenEdge } from '@/lib/jwtEdge'

export async function middleware(req) {
  const { pathname } = req.nextUrl

  if (pathname.includes('/auth') || pathname.includes('/external')) {
    return NextResponse.next()
  }

  const authHeader = req.headers.get('authorization')
  if (!authHeader) return NextResponse.json({ message: 'authHeader missing' }, { status: 401 })

  const token = authHeader.split(' ')[1]
  if (!token) return NextResponse.json({ message: 'token missing' }, { status: 401 })

  try {
    const decoded = await verifyTokenEdge(token)
    if (!decoded) return NextResponse.json({ message: 'decoded missing' }, { status: 401 })

    const res = NextResponse.next()

    res.headers.set('x-user-id', decoded.id)
    res.headers.set('x-user-role', decoded.role || '')

    return res
  } catch (err) {
    console.log('middleware error -> ', err)
    return NextResponse.json({ message: 'Invalid or expired token' }, { status: 401 })
  }
}

export const config = {
  matcher: '/api/v1/:path*'
}
