type AxeIssue = {
  description?: string
  help?: string
  helpUrl?: string
  html?: string
  id?: string
  impact?: ImpactValue
  none?: any[]
  selector?: string | null
  status?: string
  tags?: string[]
  target?: string[]
  testedUrl?: string
  uid?: string
}

type AxeResults = {
  passes: AxeIssue[];
  violations: AxeIssue[];
  incomplete: AxeIssue[];
  inapplicable: AxeIssue[];
}

type ImpactValue = 'minor' | 'moderate' | 'serious' | 'critical' | null;

export {
  AxeResults,
  AxeIssue
}