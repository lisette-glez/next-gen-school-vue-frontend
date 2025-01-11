<script setup lang="ts">
import type { AccordionItem } from '~/types';

const props = defineProps<{
    items: AccordionItem[];
    nested?: boolean;
}>();

const openIndex = ref<number | null>(null);

const toggle = (index: number) => {
    openIndex.value = openIndex.value === index ? null : index;
};

const isOpen = (index: number) => {
    return openIndex.value === index;
};
</script>

<template>
    <div class="min-w-full mx-auto space-y-3">
        <div v-for="(item, index) in items" :key="index">
            <div @click="toggle(index)"
                class="flex justify-between items-center cursor-pointer bg-gray-200 p-3 rounded">
                <div>
                    <h3 class="text-md font-semibold">{{ item.title }}</h3>
                    <p class="text-sm" v-if="item.description">{{ item.description }}</p>
                </div>
                <svg class="w-5 h-5 text-gray-500 transition-transform duration-200"
                    :class="{ 'rotate-180': isOpen(index) }" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                    fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd" />
                </svg>
            </div>
            <div v-if="isOpen(index)" class="px-6 mt-3">
                <slot :item="item"></slot>
                <div v-if="nested && item.lessons">
                    <Accordion :items="item.lessons" nested></Accordion>
                </div>
                <div v-else>
                    <p v-if="item.content" class="text-gray-600">{{ item.content }}</p>
                </div>
            </div>
        </div>
    </div>
</template>