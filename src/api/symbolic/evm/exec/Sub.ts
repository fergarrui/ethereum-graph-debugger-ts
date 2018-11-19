import { Executor } from './Executor'
import { EVM } from '../EVM'
import { Operation } from '../../../bytecode/Operation'
import { Word } from '../Word'
import { BN } from 'bn.js'
import { Symbols } from '../Symbols'

export class Sub implements Executor {
  execute(op: Operation, evm: EVM) {
    const operand1 = evm.stack.pop()
    const operand2 = evm.stack.pop()
    if (!operand1.isSymbolic && !operand2.isSymbolic) {
      const op1Value = operand1.value
      const op2Value = operand2.value
      const max32bytesUint = new BN('ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', 16)
      const min32bytesUint = new BN('00', 16)
      let result = op1Value.sub(op2Value)
      if (result.lt(min32bytesUint)) {
        result = result.add(max32bytesUint).add(new BN('01', 16))
      }
      evm.stack.push(Word.createLiteral(result.toString(16)))
    } else {
      evm.stack.push(Word.createSymbolic(Symbols.UNKNOWN))
    }
  }
}
