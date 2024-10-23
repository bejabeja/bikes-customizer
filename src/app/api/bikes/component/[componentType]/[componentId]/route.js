import { getComponentBy } from '@/app/api/services/bikesService';
import { NextResponse } from 'next/server';


export async function GET(request, context) {
    const { componentType, componentId } = context.params;
    const componentIdParam = Number(componentId)

    try {
        const component = await getComponentBy(componentType, componentIdParam);
        if (!component) {
            return NextResponse.json({ error: 'Component not found' }, { status: 404 });
        }

        return NextResponse.json({
            component
        });

    } catch (error) {
        return NextResponse.json({ error: 'Error fetching component' }, { status: 500 });
    }
}