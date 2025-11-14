import axios from 'axios';
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const data_floods1 = await axios.get('https://hdms.doh.go.th/internal-api/public/dashboard?start=2025-11-01&end=2025-11-01&searchText=&division=&district=&depot=&province=&amphoe=&tambon=&incidentType=&status=open&floodLevel=&passage=all');
        const data1 = data_floods1.data.map((val) => {
            return {
                name: 'อุทกภัย',
                province: val.province,
                cause: val.cause_of_accident,
                km_start: val.km_start,
                km_end: val.km_end,
                start_date: val.start_date,
                lat: val.latitude,
                lon: val.longitude
            }
        })
        const data_floods2 = await axios.get('https://fms.drr.go.th/get/flooddetail?situationDateTo=2025-11-01&publish_only=true&nolimit=true&fordashBoard=true&addIndexPrefix=true&sortBy=all&isBacktoNormal=false');
        const data2 = Object.values(data_floods2.data).map(val => ({
            name: 'อุทกภัย',
            province: val.province_name_political,
            cause: val.storm_name || '-',
            km_start: val.km_start,
            km_end: val.km_end,
            start_date: val.start_situation_date,
            lat: val.km_start_latitude,
            lon: val.km_end_longitude
        }))
         const mergedData = [...data1, ...data2];
        return NextResponse.json({
            ok: true,
            data: mergedData
        })
    } catch (error) {
        return NextResponse.json({
            ok: false,
            data: error
        })
    }
}