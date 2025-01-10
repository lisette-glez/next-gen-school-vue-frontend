import type { Module } from "@/types";
export const useModules = () => {
    const { $customFetch } = useNuxtApp()    
    async function getModules(): Promise<Module[] | null> {       
        try {
            const fetchedModules = await $customFetch<Module[]>('/modules');                    
            return fetchedModules.map(module => ({
                ...module,               
            }));
        } catch (err) {
            console.log("Error fetching modules data", err)           
            return null;
        }
    }

    return {
        getModules,        
    };
}