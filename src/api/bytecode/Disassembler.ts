import { Operation } from './Operation'
import { DisassembledContract } from './DisassembledContract'

export interface Disassembler {
  disassembleSourceCode(contractName: string, source: string): DisassembledContract
  disassembleContract(bytecode: string): DisassembledContract
  disassembleBytecode(bytecode: string): Operation[]
}
