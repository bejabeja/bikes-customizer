import { NextResponse } from 'next/server';
import { getBikeTypes } from '../services/bikesService';

export async function GET() {
    try {
        const bikes = await getBikeTypes()
        if (!bikes) {
            return NextResponse.json({ error: 'No bikes available' }, { status: 404 });
        }

        return NextResponse.json({
            bikes
        })
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching bike types' }, { status: 500 });
    }
}