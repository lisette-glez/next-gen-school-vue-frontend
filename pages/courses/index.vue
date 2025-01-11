<script setup lang="ts">
import type { Course } from '~/types';

definePageMeta({
    middleware: ["auth"],
    layout: "admin"
})

const { getCourses } = useCourses();

const courses = ref<Course[] | null>(null);
const currentPage = ref(1);
const itemsPerPage = 5;

const paginatedCourses = computed(() => {
    if (courses.value === null) {
        return [];
    }
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return courses.value?.slice(start, end) || [];
});

const totalPages = computed(() => {
    if (courses.value === null) {
        return 0;
    }
    return Math.ceil(courses.value.length / itemsPerPage);
});

const loadCourses = async () => {
    try {
        courses.value = await getCourses();
    } catch (error) {
        console.error('Error loading courses:', error);
    }
};

const { $usePagination } = useNuxtApp()
const { nextPage, prevPage } = $usePagination(currentPage, totalPages);

onMounted(() => {
    loadCourses();
});
</script>
<template>
    <div>
        <p class="text-2xl font-semibold mb-5 mt-3">Courses</p>
        <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead class="border-b-2 border-gray-200">
                <tr>
                    <th class="py-3 px-6 text-left text-sm font-semibold">Title</th>
                    <th class="py-3 px-6 text-left text-sm font-semibold">Description</th>
                    <th class="py-3 px-6 text-left text-sm font-semibold">Price</th>
                    <th class="py-3 px-6 text-left text-sm font-semibold">Actions</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
                <tr class="hover:bg-gray-100 text-sm" v-for="course in paginatedCourses" :key="course.id">
                    <td class="py-4 px-6">{{ course.title }}</td>
                    <td class="py-4 px-6">{{ course.description }}</td>
                    <td class="py-4 px-6">{{ course.price }}</td>
                    <td class="text-center">                        
                        <router-link :to="{ name: 'CourseDetails', params: { id: course.id } }">
                            <button class="hover:text-purple-accent-200">
                            <svg class="fill-current " width="18" height="18" viewBox="0 0 18 18" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                                    fill="" />
                                <path
                                    d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                                    fill="" />
                            </svg>
                            </button>
                        </router-link>                   
                    </td>
                </tr>
            </tbody>
        </table>  
        <div class="mt-4 flex justify-end items-center space-x-2">
                <button @click="prevPage" :disabled="currentPage === 1"
                    class="px-1 py-1 bg-purple-600 text-white rounded disabled:opacity-50 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <span class="text-gray-700 text-sm">Page {{ currentPage }} of {{ totalPages }}</span>
                <button @click="nextPage" :disabled="currentPage === totalPages"
                    class="px-1 py-1 bg-purple-600 text-white rounded disabled:opacity-50 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div> 
    </div>
</template>