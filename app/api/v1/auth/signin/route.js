import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import {NextResponse} from "next/server";
import {parseError} from "@/utils/parseError.util";
import {isEmpty} from "lodash";
import {generateTokens} from "@/lib/jwt";

export async function GET (req) {
  return NextResponse.json({
    ok: true,
    data: 'Hello world'
  })
}

export async function POST (req) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      throw new Error("Missing fields")
    }

    const user = await prisma.users.findUnique({ where: { email } })

    if (isEmpty(user)) {
      throw new Error("Invalid email or password")
      // return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 })
    }

    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) {
      throw new Error("Invalid email or password")
      // return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 })
    }

    const { accessToken } = generateTokens(user)

    return NextResponse.json({
      ok: true,
      data: {
        token: accessToken
      }
    })
  } catch (error) {
    const message = parseError(error)
    console.log('error', error)
    console.log('message', message)

    return NextResponse.json(
      {
        ok: false,
        message
      },
      { status: 400 }
    )
  }
}

