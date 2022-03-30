<script setup lang="ts">
// global imports
import { reactive, computed } from '@vue/reactivity';

// components imports
import BaseInput from './BaseInput.vue';
import AppButton from './AppButton.vue';
import Collapsible from './Collapsible.vue';
import { postAxeRequest } from '../composables/use-test-api'

// data
const form = reactive({
  pages: [
    {
      url: null,
      selector: null
    }
  ],
  title: undefined,
  fileName: undefined,
  resultsDir: undefined,
  basicAuth: {
    username: undefined,
    password: undefined
  },
  axeConfig: {
    reporter: undefined
  },
  viewport: {
    width: undefined,
    height: undefined
  }
})
const disabled = computed(() => {
  return (!form.pages[0].url)
})

// methods
function addPage() {
  form.pages.push({ url: null, selector: null })
}
function removePage() {
  form.pages.pop()
}
function sendForm() {
  console.log('sending form...')
  const formData = form
  const data = {
    ...formData,
    basicAuth:
      formData.basicAuth.username && formData.basicAuth.password
        ? formData.basicAuth
        : undefined,
    axeConfig: formData.axeConfig.reporter ? formData.axeConfig : undefined,
    viewport:
      formData.viewport.width && formData.viewport.height
        ? formData.viewport
        : undefined
  }
  // emit('submit', data)
  postAxeRequest(data)
}
</script>
<template>
  <section>
    <h2>Audit configuration</h2>
    <form @submit.prevent>
      <fieldset
        class="
          py-6 my-6 md:my-10
          border-b border-gray-300
        "
      >
        <h3>Pages</h3>
        <div
          v-for="(page, index) in form.pages"
          class="flex flex-col"
        >
          <div class="flex flex-row items-end">
            <BaseInput
              :id="`url-${index}`"
              label="Url"
              :name="`url-${index}`"
              placeholder="url"
              v-model="page.url"
              class="flex-grow"
            />
            <AppButton
              v-if="index !== 0"
              label="Remove page"
              variant="secondary"
              class="mb-4 ml-4"
              @click="removePage"
            />
          </div>
          <BaseInput
            :id="`selector-${index}`"
            label="HTML Selector"
            :name="`selector-${index}`"
            placeholder="selector"
            v-model="page.selector"
            note="use .class or #id to choose selector to test, just one selector allowed. If empty whole document will be tested."
            class="md:w-1/2 self-end"
          />
        </div>
        <AppButton
          label="Add another page"
          class="w-full md:w-auto"
          @click="addPage"
        />
      </fieldset>
      <Collapsible
        title="General"
        :open="true"
      >
        <div
          class="
            grid grid-col-1
            md:grid-cols-2
            gap-6 md:gap-x-8 md:gap-y-4
          "
        >
          <BaseInput
            id="audit-title"
            label="Audit title"
            name="audit-title"
            placeholder="Audit title"
            v-model="form.title"
          />
          <BaseInput
            id="file-name"
            label="Result file name"
            name="file-name"
            placeholder="Result file name"
            v-model="form.fileName"
          />
          <BaseInput
            id="result-dir"
            label="Result directory name"
            name="result-fir"
            placeholder="Result directory name"
            v-model="form.resultsDir"
          />
        </div>
      </Collapsible>
      <Collapsible
        title="Optional config"
      >
        <div
          class="
            grid grid-col-1
            md:grid-cols-2
            gap-6 md:gap-x-8 md:gap-y-4
          "
        >
          <h4 class="col-span-2 mb-0">
            Axe configuration
          </h4>
          <BaseInput
            id="reporter"
            label="Reporter"
            name="axe-reporter"
            placeholder="Audit title"
            v-model="form.axeConfig.reporter"
          />
          <h4 class="col-span-2 mb-0">
            Viewport
          </h4>
          <BaseInput
            id="viewport-width"
            label="Width"
            name="viewport-width"
            placeholder="Viewport width"
            v-model="form.viewport.width"
          />
          <BaseInput
            id="viewport-height"
            label="Height"
            name="viewport-height"
            placeholder="Vieport height"
            v-model="form.viewport.height"
          />
          <h4 class="col-span-2 mb-0">
            Basic Auth configuration
          </h4>
          <BaseInput
            id="username"
            label="User name"
            name="username"
            placeholder="User name"
            v-model="form.basicAuth.username"
          />
          <BaseInput
            id="password"
            label="Password"
            name="password"
            type="password"
            placeholder="Password"
            v-model="form.basicAuth.password"
          />
        </div>
      </Collapsible>
      <AppButton
        label="Send"
        type="submit"
        :disabled="disabled"
        class="w-full lg:w-1/2"
        @click="sendForm"
      />
    </form>
  </section>
</template>