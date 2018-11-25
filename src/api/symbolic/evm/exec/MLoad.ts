import { Executor } from './Executor'
import { EVM } from '../EVM'
import { Operation } from '../../../bytecode/Operation'

export class MLoad implements Executor {
  execute(op: Operation, evm: EVM) {
    const location = evm.stack.pop()
    // TODO support symbolic memory
    if (!location.isSymbolic) {
      const memoryValue = evm.memory.loadWord(location.value.toNumber())
      evm.stack.push(memoryValue)
    }
  }
}
