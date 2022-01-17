import { computed, WritableComputedRef, SetupContext } from 'vue'
// check replacement with useVModel from vueuse: https://vueuse.org/core/useVModel/

export const useModelWrapper = <T, R>(
  props: T & { modelValue: R },
  emit:SetupContext['emit']
): WritableComputedRef<R> => {
  return computed({
    get: (): R => props.modelValue,
    set: (value) => emit('update:modelValue', value)
  })
}
