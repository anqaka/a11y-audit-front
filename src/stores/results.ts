import { defineStore } from 'pinia'
import { groupBy } from '../composables/group-by'
import { AxeIssue } from '../types/axe'

export const useAxeResults = defineStore('results', {
  state: () => ({
    results: {
      violations: []
    },
    activeFilters: []
  }),
  getters: {
    getViolations: (state): AxeIssue[] => {
      if (state.activeFilters.length) {
        let filteredViolations: AxeIssue[] = state.results.violations
        state.activeFilters.forEach((filter) => {
          filteredViolations = filteredViolations.filter(v => v[filter.id].includes(filter.value))
        })
        return filteredViolations
      } else {
        return state.results.violations
      }
    },
    getGroupedByIds(): AxeIssue[] {
      return this.getViolations ? groupBy(this.getViolations, 'id') : []
    },

  },
  actions: {
    setResult (payload: any) {
      const foo = payload
      const items = foo.violations.map(item => {
        for (const key in item) {
          const itemValue = item[key]
          // console.log(key, itemValue, Array.isArray(itemValue))
          if (Array.isArray(itemValue) && !itemValue.length) {
            delete item[key]
          } else if (Array.isArray(itemValue) && typeof itemValue[0] === 'object') {
            // console.log('array with objects', itemValue)
            itemValue.forEach(ii => {
              for (const keyNest in ii) {
                // console.log(keyNest, ii[keyNest])
                if (keyNest === 'message') {
                  item.messages ? item.messages = [...item.messages, ii[keyNest]] : item.messages = [ii[keyNest]]
                }
              }
            })
            delete item[key]
            // for (const keyNest in itemValue) {
            //   console.log(keyNest, itemValue[keyNest])
            // }
          }
        }
        // console.log('item', typeof item);
        // Object.entries(item).forEach(i => {
        //   // if ()
        //   console.log(i, Array.isArray(i), i.length);

        // })
        return item
      })
      // console.log(items)
      this.results = { title: payload.title, violations: items }
    },
  }
})