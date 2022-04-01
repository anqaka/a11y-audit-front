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
const allIssues = computed(() => store.getIssuesNumberAll)
const summary = computed(() => {
  return store.getGroupedByIdsFoo
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
    <div v-if="(violations && violations.length)">
      <h3 class="text-center my-6">
        Summary
      </h3>
      <div>Issues found: {{ allIssues }}</div>

      <div class="p-6 grid grid-cols-1 md:grid-cols-3">
        <div
          v-for="(item) in summary"
          :key="item.id"
          class="px-2 py-4 flex flex-row items-center"
        >
          <div v-for="(value, key) in item">
            <span
              :class="[
                'font-bold text-lg'
              ]"
            >{{ value }}</span>
          </div>
        </div>
      </div>
    </div>
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

