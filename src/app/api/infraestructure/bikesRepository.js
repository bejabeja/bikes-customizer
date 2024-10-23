import data from '@/data/bikes.json';

export async function findBikesTypes() {
    return data.bikeTypes;
};

export async function findBikeComponentsBy(bikeId) {
    return await data.bikeCompatibleComponents.filter(
        (compatibleComponent) => bikeId === compatibleComponent.bikeId);
}

export async function findBikeComponentByComponentType(bikeId, componentType) {
    return await data.bikeCompatibleComponents.filter(comp => {
        return bikeId === comp.bikeId && componentType === comp.componentType;
    });
}

export async function findComponentBy(type, id) {
    return await data[type].find(item => id === item.id);
}

export async function findCompatibilityByComponent(type, id) {
    return await data.componentCompatibility.filter((item) => {
        return item.componentType === type && item.componentId === id;
    });

}



