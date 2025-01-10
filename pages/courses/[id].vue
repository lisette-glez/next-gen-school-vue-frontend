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
    <div class="container mx-auto p-4">
        <h1 class="text-2xl font-bold mb-6">Modules</h1>
        <Accordion :items="course?.modules"></Accordion>
    </div>
</template>