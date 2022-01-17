<script setup lang="ts">
  import { withDefaults, defineProps, defineEmits } from '@vue/runtime-core'
  import { useModelWrapper } from '../composables/use-model-wrapper'
  interface Props {
    id: string
    label: string
    name: string
    required?: boolean
    type?: string
    modelValue?: string | number
    placeholder?: string
    note?: string
  }
  const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    required: false,
    type: 'text'
  })
  const emit = defineEmits(['input'])
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
    <input
      :type="type"
      :name="name"
      :id="id"
      v-model="inputValue"
      class="
        block w-full mt-1
        h-12
        border border-gray-300
        sm:text-sm
        shadow-sm
        rounded-sm
        focus:ring-indigo-500
        focus:border-indigo-500
      "
    />
    <p
      v-if="note"
      class="mt-1"
    >
      {{ note }}
    </p>
  </div>
</template>
