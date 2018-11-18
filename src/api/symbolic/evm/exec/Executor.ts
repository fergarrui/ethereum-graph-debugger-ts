import { EVM } from '../EVM'
import { BN } from 'bn.js'

export interface Executor {
  execute(argument: BN, evm: EVM)
}
