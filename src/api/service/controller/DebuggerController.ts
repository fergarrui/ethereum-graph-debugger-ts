import { Route, Controller, Get, Query } from 'tsoa'
import { provideSingleton, inject } from '../../../inversify/ioc'
import { TYPES } from '../../../inversify/types'
import { CFGService } from '../service/CFGService'
import { CFGContract } from '../bean/CFGContract'
import { GraphVizService } from '../../cfg/GraphVizService'

@Route('debug')
@provideSingleton(DebuggerController)
export class DebuggerController extends Controller {
  constructor(
    @inject(TYPES.CFGService) private cfgService: CFGService,
    @inject(TYPES.GraphVizService) private graphVizService: GraphVizService
  ) {
    super()
  }

  @Get('cfg')
  async getCFGFromSource(
    @Query('source') source: string,
    @Query('name') name: string,
    @Query('constructor') constructor?: boolean
  ): Promise<string> {
    const contractBlocks: CFGContract = this.cfgService.buildCFGFromSource(name, source)
    let blocks = contractBlocks.contractRuntime.blocks
    if (constructor) {
      blocks = contractBlocks.contractConstructor.blocks
    }
    return this.graphVizService.createDotFromBlocks(blocks)
  }
}
