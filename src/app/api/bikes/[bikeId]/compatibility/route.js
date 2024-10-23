import { getCompatibilityAndAvailableComponents } from '@/app/api/services/bikesService';
import { NextResponse } from 'next/server';

export async function GET(request) {
    const params = request.nextUrl.searchParams
    const bikeId = Number(params.get("bike"));
    const componentType = 'frames';
    const componentId = Number(params.get("frames"));

    try {
        const compatibilityBetweenComponent = await getCompatibilityAndAvailableComponents(bikeId, componentType, componentId)

        return NextResponse.json({
            compatibilityBetweenComponent
        });

    } catch (error) {
        return NextResponse.json({ error: 'Error fetching bike types' }, { status: 500 });
    }
}
