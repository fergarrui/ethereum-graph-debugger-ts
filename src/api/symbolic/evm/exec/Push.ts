import { Executor } from './Executor'
import { EVM } from '../EVM'
import { BN } from 'bn.js'
import { Word } from '../Word'

export class Push implements Executor {
  execute(argument: BN, evm: EVM) {
    const word: Word = {
      isSymbolic: false,
      value: argument
    }
    evm.stack.push(word)
  }
}
