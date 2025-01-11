<script setup lang="ts">
import type { Lesson } from '~/types';

definePageMeta({
    middleware: ["auth"],
    layout: "admin"
})

const { getLessons } = useLessons();

const lessons = ref<Lesson[] | null>(null);
const currentPage = ref(1);
const itemsPerPage = 5;

const paginatedLessons = computed(() => {
    if (lessons.value === null) {
        return [];
    }
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return lessons.value?.slice(start, end) || [];
});

const totalPages = computed(() => {
    if (lessons.value === null) {
        return 0;
    }
    return Math.ceil(lessons.value.length / itemsPerPage);
});

const loadLessons = async () => {
    try {
        lessons.value = await getLessons();
    } catch (error) {
        console.error('Error loading lessons:', error);
    }
};

const { $usePagination } = useNuxtApp()
const { nextPage, prevPage } = $usePagination(currentPage, totalPages);

onMounted(() => {
    loadLessons();
});
</script>
<template>       
        <div>
            <p class="text-2xl font-semibold mb-5 mt-3">Lessons</p>
            <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead class="border-b-2 border-gray-200">
                    <tr>             
                        <th class="py-3 px-6 text-left text-sm font-semibold">Module</th>          
                        <th class="py-3 px-6 text-left text-sm font-semibold">Title</th>
                        <th class="py-3 px-6 text-left text-sm font-semibold">Description</th>  
                        <th class="py-3 px-6 text-left text-sm font-semibold">Content</th>         
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                    <tr class="hover:bg-gray-100 text-sm" v-for="lesson in paginatedLessons" :key="lesson.id">
                        <td class="py-4 px-6">{{ lesson.module.title }}</td>                     
                        <td class="py-4 px-6">{{ lesson.title }}</td>
                        <td class="py-4 px-6">{{ lesson.description }}</td> 
                        <td class="py-4 px-6">{{ lesson.content }}</td>                                 
                    </tr>
                </tbody>
            </table>
            <div class="mt-4 flex justify-end items-center space-x-2">
                <button @click="prevPage" :disabled="currentPage === 1"
                    class="px-1 py-1 bg-blue-gray-accent-100 text-white rounded disabled:opacity-50 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <span class="text-gray-700 text-sm">Page {{ currentPage }} of {{ totalPages }}</span>
                <button @click="nextPage" :disabled="currentPage === totalPages"
                    class="px-1 py-1 bg-blue-gray-accent-100 text-white rounded disabled:opacity-50 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>            
        </div>
</template>