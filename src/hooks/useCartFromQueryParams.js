import { fetchComponentBy } from '@/lib/bikeService';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export const useCartFromQueryParams = (setCart) => {
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        setCartFromQueryParams(searchParams, setCart);
    }, [searchParams, setCart]);

    const removeFromQueryParams = (productType) => {
        const currentParams = new URLSearchParams(searchParams);

        if (productType === 'frames') {
            const paramsToRemove = Array.from(currentParams.keys()).filter(key => key !== 'bike');
            paramsToRemove.forEach(key => currentParams.delete(key));
        } else {

            const associations = {
                wheels: ['handlebars'],
                batteries: ['motors'],
            };

            const relatedParams = associations[productType];
            if (relatedParams) {
                relatedParams.forEach(param => currentParams.delete(param));
            }
        }
        currentParams.delete(productType);
        replace(`${pathname}?${currentParams.toString()}`);
    };

    return {
        removeFromQueryParams,
    };
};

async function setCartFromQueryParams(searchParams, setCart) {
    const newCart = [];
    const filterParams = Array.from(searchParams.entries())
        .filter(([key]) => key !== 'bike');

    const componentInfo = filterParams.map(async ([componentType, componentId]) => {
        return await fetchComponentBy(componentType, parseInt(componentId));
    });

    const allComponentsInfo = await Promise.all(componentInfo)

    allComponentsInfo.forEach(componentData => {
        if (componentData) {
            newCart.push(componentData);
        }
    });

    setCart(newCart);
}
