import { injectable } from 'inversify'
import { CFGBlocks } from './CFGBlocks'
import { OperationBlock } from './OperationBlock'
import { Operation } from '../bytecode/Operation'

@injectable()
export class GraphVizService {
  createDotFromBlocks(blocks: CFGBlocks): string {
    return `digraph G {
      ${this.buildBody(blocks)}
    }`
  }

  private buildBody(blocks: CFGBlocks): string {
    let body: string = ''
    blocks.keys().forEach(key => {
      const block = blocks.get(key)
      body += `${block.offset} [label="${this.buildOps(block.operations)}"]`
      body += this.buildRelations(block)
    })
    return body
  }

  private buildOps(operations: Operation[]): string {
    let ops = ''
    for (const op of operations) {
      ops += ` 0x${op.offset.toString(16)} | ${op.opcode.name}`
      if (op.opcode.name.startsWith('PUSH')) {
        ops += `0x${op.argument.toString(16)}`
      }
    }
    return ops
  }

  private buildRelations(block: OperationBlock): string {
    let relations = ''
    if (block.childA) {
      relations += `${block.offset} -> ${block.childA}\n`
    }
    if (block.childB) {
      relations += `${block.offset} -> ${block.childB}\n`
    }
    return relations
  }
}
