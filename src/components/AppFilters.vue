<script setup lang="ts">
import { reactive, onMounted } from 'vue';
import { useAxeResults } from '../stores/results'
import useStatusOptions from '../composables/use-status-options'
import BaseSelect from './BaseSelect.vue';
import Collapsible from './Collapsible.vue'

// types
type activeFilter = {
  id: string
  value: string
}

const store = useAxeResults()
const filters = reactive(
  [
    {
      id: 'id',
      label: 'Filter by issue',
      value: '',
      options: []
    },
    {
      id: 'testedUrl',
      label: 'Filter by tested url',
      value: '',
      options: []
    },
    {
      id: 'tags',
      label: 'Filter by tag',
      value: '',
      options: []
    },
    {
      id: 'impact',
      label: 'Filter by impact',
      value: '',
      options: []
    },
    {
      id: 'status',
      label: 'Filter by status',
      value: '',
      options: useStatusOptions()
    }
  ]
)

function getStringFilterOptions(filterOptions: string[], filterKey: string): void {
  store.getViolations.forEach((violation) => {
    if (!filterOptions.includes(violation[filterKey])) {
      filterOptions.push(violation[filterKey])
    }
  })
}
function getArrayFilterOptions(filterOptions: string[], filterKey: string): void {
  store.getViolations.forEach((violation) => {
    violation[filterKey].forEach((tag) => {
      if (!filterOptions.includes(tag)) {
        filterOptions.push(tag)
      }
    })
  })
}

function setActive(filter: activeFilter, value: any): void {
  if (!value) {
    store.activeFilters.pop(filter)
  } else if (store.activeFilters.findIndex(obj => obj.id === filter.id) === -1) {
    store.activeFilters.push(filter)
  }
}

onMounted(() => {
  getStringFilterOptions(filters[0].options, 'id')
  getStringFilterOptions(filters[1].options, 'testedUrl')
  getArrayFilterOptions(filters[2].options, 'tags')
  getStringFilterOptions(filters[3].options, 'impact')
  getStringFilterOptions(filters[4].options, 'status')
})
</script>
<template>
  <Collapsible
    title="Filters"
  >
    <div
      class="
        grid grid-cols-1
        sm:grid-cols-2 md:grid-cols-3
        lg:grid-cols-5 gap-4
      "
    >
      <div
        v-for="filter in filters"
      >
        <BaseSelect
          :id="filter.id"
          :name="filter.id"
          :options="filter.options"
          :label="filter.label"
          v-model="filter.value"
          @update:modelValue="setActive(filter, filter.value)"
        />
      </div>
    </div>
  </Collapsible>

</template>

