<script setup lang="ts">
const { $customFetch } = useNuxtApp()

await $customFetch("/logout", {
    method: "POST",
  });
  useRouter().replace("/login");
</script>  

<template>
  <div>
    <p>Logging out</p>
  </div>
</template>