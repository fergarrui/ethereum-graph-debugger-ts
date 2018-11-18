import { Executor } from './Executor'
import { EVM } from '../EVM'
import { Operation } from '../../../bytecode/Operation'

export class MStore implements Executor {
  execute(op: Operation, evm: EVM) {
    const location = evm.stack.pop()
    const value = evm.stack.pop()
    if (!location.isSymbolic) {
      evm.memory.writeWord(location.value.toNumber(), value)
    }
  }
}
