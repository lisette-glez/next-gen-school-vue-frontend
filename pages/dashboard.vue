<script setup lang="ts">
definePageMeta({
    middleware: ["auth"]
})

const { user, logout } = useAuth();
const { getCourses } = useCourses();

const courses = ref([]);
const currentPage = ref(1);
const itemsPerPage = 5;

const paginatedCourses = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return courses.value.slice(start, end);
});

const totalPages = computed(() => {
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
    <div class="flex h-screen">
        <!-- Sidebar -->
        <div class="w-70 bg-blue-gray-accent-100 text-white flex flex-col">
            <div class="p-4 text-lg font-bold center">
                Admin
            </div>
            <nav class="flex-1 px-2 py-4 space-y-1">
                <a href="#"
                    class="block px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                    Courses
                </a>
                <a href="#"
                    class="block px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                    Modules
                </a>
                <a href="#"
                    class="block px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                </a>
            </nav>
            <div class="px-4 py-2 border-t border-gray-700">
                <div class="flex items-center space-x-2">
                    <svg class="w-6 h-6 rounded-full bg-gray-300 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                        <path
                            d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                    <span class="text-sm">{{ user.name }}</span>
                    <button @click="logout()"
                        class="px-1 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 flex items-center space-x-1">
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </div>
        <!-- Main content -->
        <div class="flex-1 p-6 bg-gray-100">
            <p class="text-2xl font-semibold mb-5 mt-3">Courses</p>
            <table class="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead class="border-b-2 border-gray-200">
                    <tr>
                        <th class="py-3 px-6 text-left text-sm font-semibold">Title</th>
                        <th class="py-3 px-6 text-left text-sm font-semibold">Description</th>
                        <th class="py-3 px-6 text-left text-sm font-semibold">Price</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                    <tr class="hover:bg-gray-100 text-sm" v-for="course in paginatedCourses" :key="course.id">
                        <td class="py-4 px-6">{{ course.title }}</td>
                        <td class="py-4 px-6">{{ course.description }}</td>
                        <td class="py-4 px-6">{{ course.price }}</td>
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
    </div>
</template>