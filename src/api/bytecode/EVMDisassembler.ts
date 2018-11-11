import { Disassembler } from "./Disassembler";
import { Operation } from "./Operation";
import { Opcodes } from "./Opcodes";
import { injectable, inject } from "inversify";
import { TYPES } from "../../inversify/types";
import {BN} from "bn.js"
import { Opcode } from "./Opcode";

@injectable()
export class EVMDisassembler implements Disassembler {
  
  constructor(
    @inject(TYPES.Opcodes) private ops: Opcodes
  ) {}

  disassemble(bytecode: string): Operation[] {
    
    let code = bytecode

    if (bytecode.startsWith('0x')) {
      code = bytecode.slice(2)
    }

    if (code.length % 2 !== 0) {
      throw new Error(`Bad input, bytecode length not even: ${code}`)
    }
    let offset = 0;
    const operations = code.match(/.{1,2}/g)
    const disassembledOperations: Operation[] = []

    for(let i=0; i<operations.length; i++) {
      const code = operations[i]
      const opcode: Opcode = this.ops.getOpcode(parseInt(code, 16))
      if(this.isPush(opcode)) {
        const parameters = opcode.parameters
        const argument = `${operations.slice(i+1, i+parameters+1).join('')}`
        const operation = this.createOperation(offset, opcode, argument)
        disassembledOperations.push(operation)
        offset = offset + 1 + (parameters)
        i = i + parameters
      } else {
        const operation = this.createOperation(offset, opcode, '0')
        disassembledOperations.push(operation)
        offset++
      }
    }
    return disassembledOperations
  }

  private createOperation(offset: number, opcode: Opcode, argument: string) {
    return {
      offset: offset,
      opcode: opcode,
      argument: new BN(argument, 16)
    } as Operation;
  }

  private isPush(opcode: Opcode): boolean {
    return opcode.name.startsWith('PUSH')
  }
}
