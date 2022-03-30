<script setup lang="ts">
import { ref } from '@vue/reactivity';

const props = defineProps<{
  title: string
  titleTextClasses?: string
  open?: boolean
}>()
const isOpen = ref(props.open || false)
</script>
<template>
  <button
    class="w-full group bg-primary"
    type="button"
    :aria-label="`${title}, click to expand`"
    @click="isOpen = !isOpen"
  >
    <slot name="trigger">
      <div
        class="
          flex flex-row pb-2 pt-4 mb-4
          justify-between items-center
          border-b border-indigo-200
          shadow-sm
          transition-all duration-300
          group-focus-visible:bg-indigo-100
        "
      >
        <span
          :class="[
            { 'font-bold text-2xl': !titleTextClasses },
            titleTextClasses
          ]"
        >
          {{ title }}
        </span>
      </div>
    </slot>
  </button>
  <transition name="fade">
    <div v-if="isOpen" class="pb-6">
      <slot></slot>
    </div>
  </transition>
</template>
<style>
.fade-enter-active,
.fade-leave-active {
  @apply transition-opacity duration-300 ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  @apply opacity-0;
}
</style>
