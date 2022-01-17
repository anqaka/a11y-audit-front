<script setup lang="ts">
import { computed } from 'vue';
import { AxeIssue } from '../types/axe'
import Collapsible from './Collapsible.vue';
const props = defineProps<{
  item: AxeIssue
}>()
const moreLabel = 'More info'
const topLabels = {
  id: 'issue',
  testedUrl: 'Tested Url',
  tags: 'Tags',
  impact: 'Impact',
  status: 'Status'
}

const expandedProps = computed(() => {
  return Object.fromEntries(Object.entries(props.item).filter(([key, value]) => !topLabels.hasOwnProperty(key)))
})

</script>
<template>
  <div class="grid grid-col-1 lg:grid-cols-5 py-4">
    <div
      class="font-bold before:content-[attr(data-before)] before:mr-1 lg:before:content-none"
      data-before="Issue:"
    >
      {{ item.id }}
    </div>
    <div
      class="before:content-[attr(data-before)] before:mr-1 lg:before:content-none"
      data-before="Tested Url:"
    >
      {{ item.testedUrl }}
    </div>
    <div
      class="before:content-[attr(data-before)] before:mr-1 lg:before:content-none"
      data-before="Tags:"
    >
      <span
        v-for="tag in item.tags"
        class="border border-primary-200 px-1 inline-block mr-1 mb-1"
      >
        {{ tag }}
      </span>
    </div>
    <div
      class="before:content-[attr(data-before)] before:mr-1 lg:before:content-none"
      data-before="Impact:"
    >
      {{ item.impact }}
    </div>
    <!--
        TODO: status shouldn't come from item axe API,
        should be select and default value should be "To Do" while we take results from API
        values should be predefined
        other then "To Do" while importing from csv
    -->
    <div
      class="before:content-[attr(data-before)] before:mr-1 lg:before:content-none"
      data-before="Impact:"
    >
      {{ item.status }}
    </div>
  </div>
  <div
    class="
      border-b
      border-indigo-200
      shadow-sm
    "
  >
    <Collapsible
      title="More info"
    >
      <template #trigger>
        <div
          class="
            flex flex-row pb-2 pt-4
            justify-between items-center
            transition-all duration-300
            group-focus-visible:bg-indigo-100
          "
        >
          <span
            class="
              border-2 border-dashed
              border-indigo-700
              text-primary-700
              font-bold px-2
            "
          >
            {{ moreLabel }}
          </span>
        </div>
      </template>
      <div class="pt-4">
        <div class="flex flex-col">
          <div
            v-for="(value, key) in expandedProps"
          >
            <template v-if="Array.isArray(value) && value.length">
              <div class="font-bold">
                {{ key }}
              </div>
              <pre
                v-if="key === 'none' || key === 'any' || key === 'all' || key === 'html'"
                v-for="i in value"
                class="max-w-full overflow-auto"
              >
                {{ i }}
              </pre>
              <div
                v-else
                v-for="i in value"
              >
                {{ i }}
              </div>
            </template>
            <template v-else-if="!Array.isArray(value)">
              <div class="font-bold">
                {{ key }}
              </div>
              {{ value }}
            </template>
          </div>
        </div>
      </div>
    </Collapsible>
  </div>
</template>