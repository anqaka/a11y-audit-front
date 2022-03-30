<script setup lang="ts">
  import { withDefaults, defineProps, defineEmits } from '@vue/runtime-core'
  import { useModelWrapper } from '../composables/use-model-wrapper'
  interface Props {
    id: string
    label: string
    name: string
    options: string[]
    required?: boolean
    modelValue?: string | number
    note?: string
  }
  const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    required: false,
  })
  const emit = defineEmits(['update:modelValue'])
  const inputValue = useModelWrapper(props, emit)
</script>
<template>
  <div class="mb-4">
    <label
      :for="name"
      class="
        block
        font-bold
        text-gray-700
      "
    >
      {{ label }}
    </label>
    <select
      :name="name"
      :id="id"
      v-model="inputValue"
      class="
        block w-full max-w-full mt-1
        h-12
        border border-gray-300
        sm:text-sm
        shadow-sm
        rounded-sm
        focus:ring-indigo-500
        focus:border-indigo-500
      "
    >
      <option value="">
        Choose an option
      </option>
      <option
        v-for="option in options"
        :value="option"
      >
        {{ option }}
      </option>
    </select>
    <p
      v-if="note"
      class="mt-1"
    >
      {{ note }}
    </p>
  </div>
</template>