import type { Course } from "@/types";
export const useCourses = () => {
    const { $customFetch } = useNuxtApp()    
    async function getCourses(): Promise<Course[] | null> {       
        try {
            const fetchedCourses = await $customFetch<Course[]>('/courses');                    
            return fetchedCourses.map(course => ({
                ...course,               
            }));
        } catch (err) {
            console.log("Error fetching courses data", err)           
            return null;
        }
    }
    
    return {
        getCourses       
    };
}