<script setup lang="ts">
import type { Course, Module } from '~/types';

definePageMeta({
    middleware: ["auth"],
    name: "CourseDetails",
    layout: "admin"
})

const course = ref<Course | null>(null)
const { getCourseDetails } = useCourses();
const route = useRoute()
onMounted(async () => {
    course.value = await getCourseDetails(route.params.id as string)
});
</script>
<template>
    <p class="text-2xl font-semibold mb-5 mt-3 text">Course Details</p>
    <div class="min-w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div class="md:flex">
            <div class="p-8">
                <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{{ course?.title }}</div>
                <p class="mt-2 text-gray-500">{{ course?.description }}</p>
                <p class="mt-2 text-gray-900 font-bold">${{ course?.price }}</p>
            </div>
        </div>
    </div>
    <div class="container mx-auto p-4" v-if="course?.modules?.length ?? 0">
        <h1 class="text-2xl font-bold my-6">Modules</h1>
        <Accordion :items="course?.modules"></Accordion>
    </div>
    <div v-else>
        <h1 class="text-2xl font-bold my-6">No modules available.</h1>
        <button
            class="block px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
            Create module
        </button>
    </div>
</template>