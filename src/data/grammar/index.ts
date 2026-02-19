import { n3Grammar as n3GrammarPart1 } from './n3-grammar'
import { n3GrammarPart2 } from './n3-grammar-part2'
import { n3GrammarPart3 } from './n3-grammar-part3'
import { n3GrammarPart4 } from './n3-grammar-part4'
import { n3GrammarPart5 } from './n3-grammar-part5'
import type { GrammarPoint } from '../../types/grammar'

export const allN3Grammar: GrammarPoint[] = [
  ...n3GrammarPart1,
  ...n3GrammarPart2,
  ...n3GrammarPart3,
  ...n3GrammarPart4,
  ...n3GrammarPart5,
]
