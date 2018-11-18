import { BN } from 'bn.js'
import { Symbols } from './Symbols'

export class Word {
  static WORD_LENGTH_IN_BYTES = 32

  isSymbolic: boolean
  value?: BN
  symbol?: Symbols
}
