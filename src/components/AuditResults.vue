<script setup lang="ts">
import { computed } from 'vue'
import { getAxeResults } from '../composables/use-test-api'
import { useAxeResults } from '../stores/results'
import { AxeIssue } from '../types/axe'

import Button from './Button.vue';
import IssuesList from './IssuesList.vue'

const store = useAxeResults()
const violations = computed(() => {
  return store.getViolations
})
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
      <Button
        label="Get results"
        @click="getAxeResults"
        class="w-1/3"
      />
    </div>
    <IssuesList
      v-if="violations && violations.length"
      :issues="violations"
     />
     <div v-else>
      <h2 class="text-center my-6">
        No issues found
      </h2>
    </div>
  </div>
</template>

