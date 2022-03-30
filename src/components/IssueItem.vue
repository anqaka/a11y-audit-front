<script setup lang="ts">
import { computed } from 'vue';
import { AxeIssue } from '../types/axe'
import Collapsible from './Collapsible.vue'
import BaseSelect from './BaseSelect.vue'
import useStatusOptions from '../composables/use-status-options'

const props = defineProps<{
  item: AxeIssue
}>()
const moreLabel = 'More info'
const topLabels = {
  id: 'Issue',
  testedUrl: 'Tested Url',
  tags: 'Tags',
  impact: 'Impact'
}

const expandedProps = computed(() => {
  return Object.fromEntries(Object.entries(props.item).filter(([key, value]) => !topLabels.hasOwnProperty(key)))
})

const statusOptions = useStatusOptions()

</script>
<template>
  <div class="grid grid-col-1 lg:grid-cols-5 py-4">
    <div
      v-for="(value, key) in topLabels"
      :key="key"
      class="
        before:font-bold
        before:content-[attr(data-before)]
        before:mr-1
        lg:before:content-none
        break-words
      "
      :data-before="`${value}:`"
    >
      <span
        v-if="Array.isArray(item[key])"
        v-for="(i, index) in item[key]"
        :key="`tag-${item[key]}- ${index}`"
        class="border border-primary-200 px-1 inline-block mr-1 mb-1"
      >
        {{ i }}
      </span>
      <template v-else>
        {{ item[key] }}
      </template>
    </div>
    <div
      class="before:content-[attr(data-before)] before:mr-1 lg:before:content-none"
      data-before="Status:"
    >
      <BaseSelect
        label="Status"
        :id="`status-${item.uid}`"
        :name="`status-${item.uid}`"
        :options="statusOptions"
        v-model="item.status"
      />
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