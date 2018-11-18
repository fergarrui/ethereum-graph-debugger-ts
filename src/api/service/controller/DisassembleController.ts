import { Controller, Route, Get, Query } from 'tsoa'
import { provideSingleton, inject } from '../../../inversify/ioc'
import { TYPES } from '../../../inversify/types'
import { Disassembler } from '../../bytecode/Disassembler'
import { DisassembledContract } from '../../bytecode/DisassembledContract'
import { DisassembledContractResponse } from '../response/DisassembledContractResponse';

@Route('disassemble')
@provideSingleton(DisassembleController)
export class DisassembleController extends Controller {
  constructor(@inject(TYPES.Disassembler) private disassembler: Disassembler) {
    super()
  }

  @Get()
  async disassembleSourceCode(
    @Query('code') code: string,
    @Query('contractName') contractName: string
  ): Promise<DisassembledContractResponse> {
    const disassembled: DisassembledContract =  this.disassembler.disassembleSourceCode(contractName, code)
    return this.contractToResponse(disassembled)
  }

  private contractToResponse(disassembled: DisassembledContract): DisassembledContractResponse {
    return {
      bytecode: disassembled.bytecode,
      hasConstructor: disassembled.hasConstructor,
      constructorOperations: disassembled.constructor.map(op => {
        return {
          offset: op.offset, 
          opcode: op.opcode,
          argument: op.argument.toString(16) 
        }
      }),
      runtimeOperations: disassembled.runtime.map(op => {
        return {
          offset: op.offset, 
          opcode: op.opcode,
          argument: op.argument.toString(16) 
        }
      })
    } as DisassembledContractResponse
  }
}
