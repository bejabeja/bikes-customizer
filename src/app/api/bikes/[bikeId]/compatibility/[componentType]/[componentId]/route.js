import { getCompatibilityComponents } from '@/app/api/services/bikesService';
import { NextResponse } from 'next/server';

export async function GET(request, context) {

    const bikeId = Number(context.params.bikeId);

    const componentType = context.params.componentType
    const componentId = Number(context.params.componentId);

    try {
        const compatibleComponentsWith = await getCompatibilityComponents(componentType, componentId);

        return NextResponse.json({
            compatibleComponentsWith
        });

    } catch (error) {
        return NextResponse.json({ error: 'Error fetching bike types' }, { status: 500 });
    }
}


