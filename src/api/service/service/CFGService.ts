import { injectable, inject } from 'inversify'
import { TYPES } from '../../../inversify/types'
import { Disassembler } from '../../bytecode/Disassembler'
import { DisassembledContract } from '../../bytecode/DisassembledContract'
import { CFGContract } from '../bean/CFGContract'
import { CFGCreator } from '../../cfg/CFGCreator'
import { Operation } from '../../bytecode/Operation'
import { EVMExecutor } from '../../symbolic/evm/EVMExecutor'
import { OpcodeExecutor } from '../../symbolic/evm/exec/OpcodeExecutor'
import { CFGBlocks } from '../../cfg/CFGBlocks'

@injectable()
export class CFGService {
  constructor(
    @inject(TYPES.Disassembler) private disassembler: Disassembler,
    @inject(TYPES.CFGCreator) private cfgCreator: CFGCreator,
    @inject(TYPES.OpcodeExecutor) private opExecutor: OpcodeExecutor
  ) {}

  buildCFGFromSource(contractName: string, source: string): CFGContract {
    const contract: DisassembledContract = this.disassembler.disassembleSourceCode(contractName, source)
    const runtimeBlocks = this.calculateCfgBlocks(contract.runtime)
    const cfgContract: CFGContract = {
      contractRuntime: {
        blocks: runtimeBlocks,
        bytecode: contract.runtime
      }
    }
    if (contract.hasConstructor) {
      const constructorBlocks = this.calculateCfgBlocks(contract.constructor)
      cfgContract.contractConstructor = {
        blocks: constructorBlocks,
        bytecode: contract.constructor
      }
    }
    return cfgContract
  }

  private calculateCfgBlocks(ops: Operation[]): CFGBlocks {
    const blocks = this.cfgCreator.divideBlocks(ops)
    const executor = new EVMExecutor(blocks, this.opExecutor)
    executor.run(0)
    return executor.blocks
  }
}
