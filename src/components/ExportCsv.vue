<script setup lang="ts">
import { computed, ref } from 'vue';
import { useAxeResults } from '../stores/results'
import AppButton from './AppButton.vue';
import { AxeIssue } from "../types/axe";
import Papa from 'papaparse';

const props = defineProps<{
  items: AxeIssue[]
}>()
const store = useAxeResults()
const fileName = computed(() => {
  return store.results.title.replace(/\s+/g, '-')
})
const dataItems = computed(() => {
  return props.items
})

const downloadUrl = ref('#')
function exportCsvFoo() {
    const issuesArr: AxeIssue[] = []
    const issuesItems = dataItems.value
    for (const key in issuesItems) {
      issuesArr.push({...issuesItems[key]})
    }
    const csvFinal = issuesArr.map(item => {
      delete item.target
      for (const i in item) {
        if (Array.isArray(item[i])) {
          const notProxy = Object.values({...item[i]}).join(' ').replace(/\s+$|\t|\n|#|\:|\\t|\\n/g, '')
          console.log(notProxy)
          item[i] = notProxy
        }
      }
      if (item.html) {
        item.html = item.html
          .replace(/\"/g, '\'')
          .replace(/\s+$||\t|\n|#|\\t|\\n/g, '')
      }
      return item
    })
    const csv = Papa.unparse(JSON.stringify(csvFinal));
    downloadUrl.value = `data:text/csv,${csv}`
}
</script>
<template>
  <a
    :download="`${fileName}.csv`"
    :class="[`
      py-2 px-6
      min-h-[48px]
      inline-flex justify-center items-center
      border-2 border-dashed border-indigo-700
      shadow-sm rounded-md
      text-sm font-medium
      transition-colors
      focus:outline-none focus:ring-2
      focus:ring-offset-2 focus:ring-indigo-500
      button--secondary
      mr-6 mt-6'`,
      {'btn--disabled': downloadUrl === '#' }
    ]"
    :href="downloadUrl"
    :disabled="(downloadUrl === '#') ? 'disabled' : false"
  >
    Export to csv
  </a>
  <AppButton
    label="Prepare CSV"
    class="mt-6"
    @click="exportCsvFoo"
  />
</template>