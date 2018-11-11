import { Disassembler } from "./Disassembler";
import { Operation } from "./Operation";
import { Opcodes } from "./Opcodes";
import { injectable, inject } from "inversify";
import { TYPES } from "../../inversify/types";
import {BN} from "bn.js"

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
    .map(opcode => {
        const operation = { offset: offset, 
          opcode: this.ops.getOpcode(parseInt(opcode, 16)), 
          argument: new BN(0) 
        } as Operation
        offset = offset + 2
        return operation
      })
      return operations
  }
}