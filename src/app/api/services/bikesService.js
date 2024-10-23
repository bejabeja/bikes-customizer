import { findBikeComponentByComponentType, findBikesTypes, findCompatibilityByComponent, findComponentBy } from '../infraestructure/bikesRepository';

// api/bikes
export async function getBikeTypes() {
    const bikes = await findBikesTypes();
    return bikes
}
// api/component/biketype/bikeid
export async function getComponentBy(type, id) {
    const component = await findComponentBy(type, id);  

    return  { ...component, componentType: type };
}

// api/bikes/compatibility
export async function getCompatibilityAndAvailableComponents(bikeId, componentType, componentId) {
    const result = {};

    const compatibleComponents = await fetchAndProcessCompatibleComponents(componentType, componentId);
    compatibleComponents.forEach(comp => {
        if (!result[comp.componentType]) {
            result[comp.componentType] = [];
        }
        result[comp.componentType].push(comp);
    });


    const availableComponents = await findAllCompatibleComponentsByBikeTypeAndComponentType(bikeId, componentType);
    if (availableComponents.length > 0) {
        if (!result[componentType]) {
            result[componentType] = [];
        }
        result[componentType].push(
            ...availableComponents.map(comp => ({
                ...comp,
                componentType,
            })));
    }


    return sortCompatibleComponents(result);
}

async function findAllCompatibleComponentsByBikeTypeAndComponentType(bikeId, componentType) {
    const components = await findBikeComponentByComponentType(bikeId, componentType);

    const componentPromises = components.map(
        async (comp) => await findComponentBy(comp.componentType, comp.componentId));

    const availableComponents = (await Promise.all(componentPromises)).filter(Boolean);

    return availableComponents;
}


// api/bikes/compatibility/compType/compid
export async function getCompatibilityComponents(componentType, componentId) {
    const compatibleComponents = await fetchAndProcessCompatibleComponents(componentType, componentId);

    const groupedComponents = groupByComponentType(compatibleComponents);
    const compatibleComponentsWith = sortCompatibleComponents(groupedComponents);

    return compatibleComponentsWith;
}

async function fetchAndProcessCompatibleComponents(componentType, componentId) {
    const compatibleComponents = await findCompatibilityByComponent(componentType, componentId);

    const allCompatibleComponents = await Promise.all(
        compatibleComponents.map(async (comp) => {
            const compatibleComponentData = await findComponentBy(comp.compatibleWithComponentType, comp.compatibleWithComponentId);
            if (compatibleComponentData) {
                return {
                    ...compatibleComponentData,
                    componentType: comp.compatibleWithComponentType,
                };
            }
            return null;
        })
    );

    return allCompatibleComponents.filter(Boolean);
}

function groupByComponentType(components) {

    return components.reduce((acc, component) => {
        const { componentType } = component;

        if (!acc[componentType]) {
            acc[componentType] = [];
        }

        acc[componentType].push(component);

        return acc;
    }, {});
}

function sortCompatibleComponents(compatibleComponents) {
    const order = ['frames', 'wheels', 'handlebars', 'batteries', 'motors', 'paints'];

    const sortedComponents = {};

    order.forEach((type) => {
        if (compatibleComponents[type]) {
            sortedComponents[type] = compatibleComponents[type];
        }
    });

    return sortedComponents;
}
