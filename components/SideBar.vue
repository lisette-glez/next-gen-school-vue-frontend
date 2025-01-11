<script setup lang="ts">
const { user, logout } = useAuth();
</script>
<template>
    <div class="w-70 bg-blue-gray-accent-100 text-white flex flex-col">
        <div class="p-4 text-lg font-bold center">
            Admin
        </div>
        <nav class="flex-1 px-2 py-4 space-y-1">
            <NuxtLink to="/courses"><span class="block px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Courses</span></NuxtLink>  
            <NuxtLink to="/modules"><span class="block px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Modules</span></NuxtLink>
            <NuxtLink to="/lessons"><span class="block px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Lessons</span></NuxtLink>  
        </nav>
        <div class="px-4 py-2 border-t border-gray-700">
            <div class="flex items-center space-x-2">
                <svg class="w-6 h-6 rounded-full bg-gray-300 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                    <path
                        d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
                <span class="text-sm">{{ user?.name }}</span>
                <button @click="logout()"
                    class="px-1 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 flex items-center space-x-1">
                    <span>Logout</span>
                </button>
            </div>
        </div>
    </div>
</template>