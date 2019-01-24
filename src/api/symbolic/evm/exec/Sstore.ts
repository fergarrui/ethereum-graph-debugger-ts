import { Executor } from './Executor'
import { EVM } from '../EVM'
import { Operation } from '../../../bytecode/Operation'

export class Sstore implements Executor {
  execute(op: Operation, evm: EVM) {
    const slot = evm.stack.pop()
    const value = evm.stack.pop()
    console.log(`SSTORE: ${slot}, ${value}`)
    evm.storage.store(slot, value)
  }
}
