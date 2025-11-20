import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server'

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
  maxDuration: 5, // วินาที
}
export async function GET() {
    try {
        const layers = await prisma.layers.findMany()

        return NextResponse.json({
            ok: true,
            data: layers
        })
    } catch (error) {
        return NextResponse.json({
            ok: false,
            data: error
        })
    }
}
export async function POST(req) {
    try {
       const { titleTh, titleEn, layerTypeTh, layerTypeEn, layerName, nameTh, nameEn } = await req.json()

        if (!titleTh || !titleEn || !layerTypeTh || !layerTypeEn || !layerName || !nameTh || !nameEn) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const newLayer = await prisma.layers.create({
            data: {
                titleTh: titleTh,
                titleEn: titleEn,
                layerTypeTh: layerTypeTh,
                layerTypeEn: layerTypeEn,
                layerName: layerName,
                nameTh: nameTh,
                nameEn: nameEn
            }
        })

        return NextResponse.json({
            ok: true,
            data: newLayer
        })
    } catch (error) {
        return NextResponse.json({
            ok: false,
            data: error
        })
    }
}
