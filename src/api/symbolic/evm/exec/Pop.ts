import { Executor } from './Executor'
import { EVM } from '../EVM'
import { BN } from 'bn.js'

export class Pop implements Executor {
  execute(argument: BN, evm: EVM) {
    evm.stack.pop()
  }
}
