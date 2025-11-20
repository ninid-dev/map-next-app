import axios from 'axios';
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const today = new Date().toISOString().split("T")[0];
        const response = await axios.get(`https://hdms.doh.go.th/internal-api/public/dashboard?start=${today}&end=${today}&searchText=&division=&district=&depot=&province=&amphoe=&tambon=&incidentType=&status=open&floodLevel=&passage=all`);
        const formatData = response.data.map((val) => {
            return {
                name: 'อุทกภัย',
                province: val.province,
                cause: val.cause_of_accident,
                km_start: val.km_start,
                km_end: val.km_end,
                start_date: val.start_date,
                lat: val.latitude,
                lon: val.longitude,
                case_id: val.case_id,
                cause_of_accident: val.cause_of_accident
            }
        })
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