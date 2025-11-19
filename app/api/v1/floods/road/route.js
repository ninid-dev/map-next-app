import axios from 'axios';
import { NextResponse } from 'next/server'

export async function GET() {
    try {
        const response = await axios.get('https://dpmreporter.disaster.go.th/portal/services/news_map/get_list.php?type=0&province=0');
        return NextResponse.json({
            ok: true,
            data: response.data.data.data
        })
    } catch (error) {
        return NextResponse.json({
            ok: false,
            data: error
        })
    }
}