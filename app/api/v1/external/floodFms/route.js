import axios from 'axios';
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const today = new Date().toISOString().split("T")[0];
        const response = await axios.get(`https://fms.drr.go.th/get/flooddetail?situationDateTo=${today}&publish_only=true&nolimit=true&fordashBoard=true&addIndexPrefix=true&sortBy=all&isBacktoNormal=false`);
        const formatData = Object.values(response.data).map(val => ({
            name: 'อุทกภัย',
            province: val.province_name_political,
            cause: val.storm_name || '-',
            km_start: val.km_start,
            km_end: val.km_end,
            start_date: val.start_situation_date,
            lat: val.km_start_latitude,
            lon: val.km_end_longitude
        }))
        return NextResponse.json({
            ok: true,
            data: formatData
        })
    } catch (error) {
        return NextResponse.json({
            ok: false,
            data: error
        })
    }
}