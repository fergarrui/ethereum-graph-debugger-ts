import { Executor } from './Executor'
import { EVM } from '../EVM'
import { Operation } from '../../../bytecode/Operation'

export class Sload implements Executor {
  execute(op: Operation, evm: EVM) {
    const slot = evm.stack.pop()
    const value = evm.storage.load(slot)
    evm.stack.push(value)
  }
}
