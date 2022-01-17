<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import AppHeader from './components/AppHeader.vue'
import ConfigForm from './components/ConfigForm.vue'
import AuditResults from './components/AuditResults.vue'

</script>

<template>
  <AppHeader title="A11y testing with axe" />
  <main
    class="
      py-8 lg:py-12
    "
  >
    <section
      class="
        container
        mx-auto px-4
      "
    >
      <ConfigForm />
    </section>
    <AuditResults />
  </main>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
