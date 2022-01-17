<script setup lang="ts">
defineProps<{ title: string }>()
</script>
<template>
  <header
    class="
      container
      mx-auto my-8 lg:my-16
    "
  >
    <h1 class="text-center">
      {{ title }}
    </h1>
  </header>
</template>