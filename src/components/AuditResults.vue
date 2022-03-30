<script setup lang="ts">
import { computed } from 'vue'
import { getAxeResults } from '../composables/use-test-api'
import { useAxeResults } from '../stores/results'

import AppButton from './AppButton.vue';
import AppFilters from './AppFilters.vue'
import IssuesList from './IssuesList.vue'

const store = useAxeResults()
const violations = computed(() => {
  return store.getViolations
})
const title = computed(() => store.results.title)
</script>
<template>
  <div
    class="
      container
      mx-auto
      px-4
      py-12
    "
  >
    <div class="text-center">
      <AppButton
        label="Get results"
        @click="getAxeResults"
        class="w-1/3"
      />
    </div>
    <h2 class="text-center my-6">
      A11y issues
      <span v-if="title"> - {{ title }}</span>
    </h2>
    <AppFilters v-if="(violations && violations.length) || store.activeFilters.length" />
    <IssuesList
      v-if="violations && violations.length"
      :issues="violations"
    />
    <div v-else>
      <h3 class="text-center my-6">
        No issues found
      </h3>
    </div>
  </div>
</template>

