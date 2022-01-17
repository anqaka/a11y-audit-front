import { $fetch } from 'ohmyfetch'
import { useAxeResults } from '../stores/results'

export async function postAxeRequest(data:any): Promise<any> {
  try {
    await $fetch(
      `${import.meta.env.VITE_AXE_URL}/axe`,
      {
        method: 'POST',
        body: data
    })
  } catch (e) {
    console.error(e, e.data)
  }
}

export async function getAxeResults () {
  try {
    const response = await $fetch(`${import.meta.env.VITE_AXE_URL}/axe`)
    const store = useAxeResults()
    store.setResult(response)
  } catch (e) {
    console.log(e)
  }
}
