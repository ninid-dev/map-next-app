import prisma from "@/config/prisma";
import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET () {
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

export async function POST (req) {
  try {
    const formData = await req.formData()

    const title = formData.get('title')
    const latStr = formData.get('lat')
    const lngStr = formData.get('lng')
    const detail = formData.get('detail')
    const files = formData.getAll('imgList')

    if (!title || !latStr || !lngStr || files.length === 0) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const lat = parseFloat(latStr)
    const lng = parseFloat(lngStr)
    if (isNaN(lat) || isNaN(lng)) {
      return NextResponse.json({ error: 'Invalid coordinates' }, { status: 400 })
    }

    // save images
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'request')
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true })

    const uploadedFiles = []
    for (const file of files) {
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const fileName = `${file.lastModified}-${file.name}`
      const filePath = path.join(uploadDir, fileName)
      fs.writeFileSync(filePath, buffer)
      uploadedFiles.push(`/uploads/request/${fileName}`)
    }

    const newRequests = await prisma.requests.create({
      data: {
        title,
        lat,
        lng,
        detail,
        imgPath: uploadedFiles.join(',')
      }
    })

    return NextResponse.json({
      ok: true,
      data: newRequests
    })
  } catch (error) {
    console.log('error', error)

    return NextResponse.json({
      ok: false,
      data: error
    })
  }
}
