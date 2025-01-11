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

    async function getCourseDetails(id: string): Promise<Course | null> {
        try {
            const course = await $customFetch<Course>(`/course/${id}`);           
            return course;
        } catch (err) {
            console.log("Error fetching course details", err);
            return null;
        }
    }
    
    return {
        getCourses,
        getCourseDetails       
    };
}