import { AxeIssue } from '../types/axe'

export function groupBy(array: AxeIssue[], key: string): AxeIssue[] {
  return array.reduce((result: any, currentValue: any) => {
    (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue)
    return result;
  }, {});
}