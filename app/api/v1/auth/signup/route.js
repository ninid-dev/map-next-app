import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import {isEmpty} from "lodash";
import {NextResponse} from "next/server";
import {parseError} from "@/utils/parseError.util";
import {generateTokens} from "@/lib/jwt";

const { BCRYPT_SALT } = process.env;

export async function POST (req) {
  try {
    const { email, password, name, tel } = await req.json()

    if (!email || !password || !name || !tel) {
      throw new Error("Missing fields")
    }

    const hashedPassword = bcrypt.hashSync(password, Number(BCRYPT_SALT))

    const existingUser = await prisma.users.findFirst({
      where: {
        OR: [
          {
            email: email,
          },
          {
            tel: tel
          }
        ]
      },
      select: {
        email: true,
        name: true,
        tel: true
      },
    })

    if (!isEmpty(existingUser)) {
      throw new Error("User already exists")
    }

    const user = await prisma.users.create({
      data: {
        email,
        password: hashedPassword,
        name,
        tel
      },
    })

    const { accessToken } = generateTokens(user)

    return NextResponse.json({
      ok: true,
      data: {
        token: accessToken
      }
    })
  } catch (error) {
    console.log('On signup error -> ', error)
    const message = parseError(error)

    return NextResponse.json(
      {
        ok: false,
        message
      },
      { status: 400 }
    )
  }
}
