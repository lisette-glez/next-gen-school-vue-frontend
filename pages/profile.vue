<script setup lang="ts">
const { user } = useAuth();
</script>

<template>
    <div>
        User Name: {{user?.name}}
    </div>
    <div>
        User Email: {{user?.email}}
    </div>
    <div>
        <NuxtLink to="/logout">Logout</NuxtLink>
    </div>
</template>