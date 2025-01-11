import type { Lesson } from "@/types";
export const useLessons = () => {
    const { $customFetch } = useNuxtApp()    
    async function getLessons(): Promise<Lesson[] | null> {       
        try {
            const fetchedLessons = await $customFetch<Lesson[]>('/lessons');                    
            return fetchedLessons.map(lesson => ({
                ...lesson,               
            }));
        } catch (err) {
            console.log("Error fetching lessons data", err)           
            return null;
        }
    }
    return {
        getLessons,        
    };
}