import { reactive } from 'vue'

export default () => {
  const statusOptions = reactive([
    'TO DO',
    'Partial',
    'Failed',
    'Check it manualy',
    'Success',
    'Not to worry'
  ])
  return statusOptions
}