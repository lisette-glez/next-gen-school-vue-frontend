<script setup lang="ts">
const { logout } = useAuth();
logout();
</script>  

<template>
  <div>
    <p>Logging out</p>
  </div>
</template>