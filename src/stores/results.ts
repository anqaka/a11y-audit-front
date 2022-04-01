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
    getGroupedByIdsFoo: (state): any[] => {
      const key = 'id'
      const summaryArr = state.results.violations.reduce((result: any, currentValue: any) => {
        let bar = result.find(obj => obj['issue'] === currentValue[key])
        if (bar) {
          bar.count++
        } else {
          result.push({
            issue: currentValue[key],
            impact: currentValue['impact'],
            count: 1
          })
        }
        return result
      }, [])
      return summaryArr
    },
    getIssuesNumberAll: (state): number => {
      return state.results.violations.length
    },
    getIssuesNumberFiltered(): number {
      const foo = this.getViolations
      return foo.length
    },
  },
  actions: {
    setResult (payload: any) {
      const foo = payload
      const items = foo.violations.map(item => {
        for (const key in item) {
          const itemValue = item[key]
          if (Array.isArray(itemValue) && !itemValue.length) {
            delete item[key]
          } else if (Array.isArray(itemValue) && typeof itemValue[0] === 'object') {
            itemValue.forEach(ii => {
              for (const keyNest in ii) {
                if (keyNest === 'message') {
                  item.messages ? item.messages = [...item.messages, ii[keyNest]] : item.messages = [ii[keyNest]]
                }
              }
            })
            delete item[key]
          }
        }
        return item
      })
      this.results = { title: payload.title, violations: items }
    }
  }
})