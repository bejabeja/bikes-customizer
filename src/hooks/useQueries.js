'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
export const useQueries = () => {
    const { replace } = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const removeParams = (data, currentParams) => {
        if (data.componentType === 'frames') {
            const paramsToRemove = Array.from(currentParams.keys()).filter(key => key !== 'bike');
            paramsToRemove.forEach(key => currentParams.delete(key));
        } else {
            const associations = {
                wheels: ['handlebars'],
                batteries: ['motors'],
            };

            const relatedParams = associations[data.componentType];
            if (relatedParams) {
                relatedParams.forEach(param => currentParams.delete(param));
            }
        }
    };

    const updateParams = (data) => {
        const currentParams = new URLSearchParams(searchParams);
        removeParams(data, currentParams);

        currentParams.set(data.componentType, data.id);
        replace(`${pathname}?${currentParams.toString()}`);
    };

    return { updateParams, removeParams };
};
