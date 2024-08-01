<script setup lang="ts">
 import type { UserProfile } from '~/types';
const { $customFetch } = useNuxtApp()
const user: UserProfile = await $customFetch("/user");
</script>

<template>
    <div>
        User Name: {{user.name}}
        User Email: {{user.email}}
        <NuxtLink to="/logout">Logout</NuxtLink>
    </div>
</template>