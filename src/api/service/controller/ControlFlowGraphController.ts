import { Route, Controller, Get, Query } from 'tsoa'
import { provideSingleton, inject } from '../../../inversify/ioc'
import { TYPES } from '../../../inversify/types'
import { CFGService } from '../service/CFGService'
import { GraphVizService } from '../../cfg/GraphVizService'
import { CFGContract } from '../bean/CFGContract'
import { GFCResponse } from '../response/CFGResponse'
import { OperationResponse } from '../response/OperationResponse'

@Route('cfg')
@provideSingleton(ControlFlowGraphController)
export class ControlFlowGraphController extends Controller {
  constructor(
    @inject(TYPES.CFGService) private cfgService: CFGService,
    @inject(TYPES.GraphVizService) private graphVizService: GraphVizService
  ) {
    super()
  }

  @Get('source')
  async getCFGFromSource(
    @Query('source') source: string,
    @Query('name') name: string,
    @Query('constructor') constructor?: boolean
  ): Promise<GFCResponse> {
    const contractBlocks: CFGContract = this.cfgService.buildCFGFromSource(name, source)
    if (!contractBlocks.contractConstructor && constructor) {
      throw new Error('Constructor is true but no constructor found in bytecode')
    }
    const cfg = this.createCFG(contractBlocks, constructor)
    return this.buildResponse(contractBlocks, constructor, cfg)
  }

  @Get('bytecode')
  async getCFGFromBytecode(
    @Query('bytecode') bytecode: string,
    @Query('constructor') constructor?: boolean
  ): Promise<GFCResponse> {
    const contractBlocks: CFGContract = this.cfgService.buildCFGFromBytecode(bytecode)
    if (!contractBlocks.contractConstructor && constructor) {
      throw new Error('Constructor is true but no constructor found in bytecode')
    }
    const cfg = this.createCFG(contractBlocks, constructor)
    return this.buildResponse(contractBlocks, constructor, cfg)
  }

  private createCFG(contractBlocks: CFGContract, constructor: boolean): string {
    let blocks = contractBlocks.contractRuntime.blocks
    if (constructor) {
      blocks = contractBlocks.contractConstructor.blocks
    }
    return this.graphVizService.createDotFromBlocks(blocks)
  }

  private buildResponse(contractBlocks: CFGContract, constructor: boolean, cfg: string) {
    let opResponse: OperationResponse[] = contractBlocks.contractRuntime.bytecode.map(op => {
      return {
        offset: op.offset,
        opcode: op.opcode,
        argument: op.argument.toString(16),
        begin: op.begin,
        end: op.end
      }
    })
    if (constructor) {
      opResponse = contractBlocks.contractConstructor.bytecode.map(op => {
        return {
          offset: op.offset,
          opcode: op.opcode,
          argument: op.argument.toString(16),
          begin: op.begin,
          end: op.end
        }
      })
    }
    return {
      cfg: cfg,
      operations: opResponse
    }
  }
}
