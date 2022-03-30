<script setup lang="ts">
import { computed } from 'vue'
interface Props {
  label: string
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}
const emit = defineEmits(['click'])
const props = withDefaults(defineProps<Props>(), {
  type: 'button',
  variant: 'primary',
  disabled: false
})
const variantClass = computed(() => {
  return `btn--${props.variant}`
})
</script>
<template>
  <button
    :class="[`
      py-2 px-6
      min-h-[48px]
      inline-flex justify-center items-center
      border-2 border-dashed border-indigo-700
      shadow-sm rounded-md
      text-sm font-medium
      transition-colors
      focus:outline-none focus:ring-2
      focus:ring-offset-2 focus:ring-indigo-500`,
      variantClass,
      {'btn--disabled': disabled }
    ]"
    :disabled="disabled ? disabled : false"
    :type="type"
    @click="$emit('click')"
  >
    <slot>{{ label }}</slot>
  </button>
</template>
<style>
.btn--primary {
  @apply text-white bg-indigo-700;
  @apply hover:bg-white hover:text-indigo-700;
}

.btn--secondary {
  @apply text-indigo-600 bg-white;
  @apply hover:bg-indigo-700 hover:text-white;
}
.btn--disabled {
  @apply bg-gray-400 hover:bg-gray-400 hover:text-white;
  @apply cursor-not-allowed;
}
</style>
