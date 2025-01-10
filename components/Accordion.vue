<script setup lang="ts">
import type { Module } from '~/types';

const props = defineProps<{ items: Module[] | undefined }>();

const activeItemId = ref<number | null>(null)

const toggleItem = (id: number) => {
    activeItemId.value = activeItemId.value === id ? null : id
}
</script>

<template>
    <div class="min-w-full mx-auto space-y-2">
        <div v-for="item in items" :key="item.id" class="border rounded-lg overflow-hidden shadow-sm">
            <button @click="toggleItem(item.id)"
                class="w-full px-4 py-3 flex justify-between items-center bg-white hover:bg-gray-50 transition-colors duration-200"
                :aria-expanded="activeItemId === item.id" :aria-controls="`content-${item.id}`">
                <span class="font-medium text-gray-900">{{ item.title }}</span>
                <svg class="w-5 h-5 text-gray-500 transition-transform duration-200"
                    :class="{ 'rotate-180': activeItemId === item.id }" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd" />
                </svg>
            </button>
            <transition enter-active-class="transition-all duration-200 ease-out"
                leave-active-class="transition-all duration-200 ease-in" enter-from-class="opacity-0 max-h-0"
                enter-to-class="opacity-100 max-h-96" leave-from-class="opacity-100 max-h-96"
                leave-to-class="opacity-0 max-h-0">
                <div v-show="activeItemId === item.id" :id="`content-${item.id}`" class="px-4 py-3 bg-white">
                    <p class="text-gray-600">{{ item.description }}</p>
                </div>
            </transition>
        </div>
    </div>
</template>