const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000/api'
export async function fetchBikes() {
    try {
        const response = await fetch(`${backendUrl}/bikes`);
        if (!response.ok) {
            throw new Error('Error loading bike types');
        }
        const { bikes } = await response.json();
        return bikes;
    } catch (error) {
        console.error('Error fetching bikes:', error);
        throw error;
    }
}

export async function fetchComponentCompatibleBetweenThem(searchParams) {
    const bikeId = searchParams?.bike
    const queryString = new URLSearchParams(searchParams).toString();

    try {
        const response = await fetch(`${backendUrl}/bikes/${bikeId}/compatibility?${queryString}`);
        if (!response.ok) {
            throw new Error('Error loading compatibility between components');
        }
        const { compatibilityBetweenComponent } = await response.json()
        return compatibilityBetweenComponent;
    } catch (error) {
        console.error('Error fetching component compatibility:', error);
        throw error;
    }
}

export async function fetchComponentBy(componentType, componentId) {
    try {
        const response = await fetch(`${backendUrl}/bikes/component/${componentType}/${componentId}`);
        if (!response.ok) {
            throw new Error('Error loading component');
        }

        const { component } = await response.json()
        return component;
    } catch (error) {
        console.error('Error fetching component compatibility:', error);
        throw error;
    }
}


export async function fetchAllComponentsTypeBy(componentType, componentId) {
    try {
        const response = await fetch(`${backendUrl}/bikes/component/${componentType}/${componentId}`);
        if (!response.ok) {
            throw new Error('Error loading component');
        }

        const { component } = await response.json()
        return component;
    } catch (error) {
        console.error('Error fetching component compatibility:', error);
        throw error;
    }
}

export async function fetchCompatibilityBy(componentType, componentId, bikeId) {
    try {
        const response = await fetch(`${backendUrl}/bikes/${bikeId}/compatibility/${componentType}/${componentId}`);
        if (!response.ok) {
            throw new Error('Error loading compatibility with component');
        }

        const { compatibleComponentsWith } = await response.json()

        return compatibleComponentsWith;
    } catch (error) {
        console.error('Error fetching component compatibility:', error);
        throw error;
    }
}