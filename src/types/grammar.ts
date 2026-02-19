export interface GrammarExample {
  ja: string
  vi: string
  reading?: string
}

export interface GrammarPoint {
  id: string
  title: string
  meaning: string
  structure: string[]
  explanation: string
  examples: GrammarExample[]
  tags?: string[]
}
