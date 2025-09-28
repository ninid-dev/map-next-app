import { PrismaClient } from "../../../generated/prisma/client";

const prisma = new PrismaClient();

export async function GET () {
  try {
    const requests = await prisma.requests.findMany()

    return Response.json({
      ok: true,
      data: requests
    })
  } catch (error) {
    return Response.json({
      ok: false,
      data: error
    })
  }
}

export async function POST (req) {
  try {
    const {
      title,
      lat,
      lng,
      detail,
    } = await req.json()

    // TODO: รับไฟล์ภาพไปเก็บแล้วเอา path มาใส่
    const imgPath = '/'

    const newRequests = await prisma.requests.create({
      data: {
        title,
        lat,
        lng,
        detail,
        imgPath
      }
    })

    return Response.json({
      ok: true,
      data: newRequests
    })
  } catch (error) {
    return Response.json({
      ok: false,
      data: error
    })
  }
}
