import prisma from "@/lib/prisma";
import {NextResponse} from "next/server";

export async function GET (req) {
  try {
    const requests = await prisma.requests.findMany()

    return NextResponse.json({
      ok: true,
      data: requests
    })
  } catch (error) {
    return NextResponse.json({
      ok: false,
      data: error
    })
  }
}
