import { Route, Controller, Get, Query } from 'tsoa'
import { provideSingleton, inject } from '../../../inversify/ioc'
import { TYPES } from '../../../inversify/types'
import { CFGService } from '../service/CFGService'
import { GraphVizService } from '../../cfg/GraphVizService'
import { CFGContract } from '../bean/CFGContract'

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
  ): Promise<string> {
    const contractBlocks: CFGContract = this.cfgService.buildCFGFromSource(name, source)
    return this.createCFG(contractBlocks, constructor)
  }

  @Get('bytecode')
  async getCFGFromBytecode(
    @Query('bytecode') bytecode: string,
    @Query('constructor') constructor?: boolean
  ): Promise<string> {
    const contractBlocks: CFGContract = this.cfgService.buildCFGFromBytecode(bytecode)
    return this.createCFG(contractBlocks, constructor)
  }

  private createCFG(contractBlocks: CFGContract, constructor: boolean) {
    let blocks = contractBlocks.contractRuntime.blocks
    if (constructor) {
      blocks = contractBlocks.contractConstructor.blocks
    }
    return this.graphVizService.createDotFromBlocks(blocks)
  }
}
