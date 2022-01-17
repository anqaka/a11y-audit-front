import { defineStore } from 'pinia'

export const useAxeResults = defineStore('results', {
  state: () => ({
    results: {}
  }),
  getters: {
    getViolations: (state) => state.results.violations || null
  },
  actions: {
    setResult (payload: any) {
      this.results = payload
    }
  }
})