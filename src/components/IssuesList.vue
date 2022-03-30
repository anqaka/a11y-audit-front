<script setup lang="ts">
import { AxeIssue } from "../types/axe";
import IssueItem from "./IssueItem.vue";
import ExportCsv from './ExportCsv.vue';

const props = defineProps<{
  issues: AxeIssue[];
}>();
const labels = [
  'Issue',
  'Tested Url',
  'Tags',
  'Impact',
  'Status'
]
</script>
<template>
  <div v-if="issues && issues.length">
    <div
      class="
        grid grid-cols-5
        py-6 mb-2
        shadow-l
        bg-primary-600/90
        text-white font-bold pl-2
      "
    >
      <div v-for="label in labels">
        {{ label }}
      </div>
    </div>
    <div class="px-2">
      <IssueItem
        v-for="item in issues"
        :key="item.uid"
        :item="item"
      />
    </div>
    <ExportCsv
      :items="issues"
    />
  </div>
</template>
