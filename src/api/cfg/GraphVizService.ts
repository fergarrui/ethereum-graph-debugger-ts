import { injectable } from 'inversify'
import { CFGBlocks } from './CFGBlocks'
import { OperationBlock } from './OperationBlock'
import { Operation } from '../bytecode/Operation'

@injectable()
export class GraphVizService {
  createDotFromBlocks(blocks: CFGBlocks): string {
    return `digraph " " {
      graph [splines=ortho ranksep="2" nodesep="2"]
      rankdir=LR
      node [shape=plain fillcolor="#2A2A2A" style=filled fontcolor="#12cc12" fontname="Courier"]
      ${this.buildBody(blocks)}
    }`
  }

  private buildBody(blocks: CFGBlocks): string {
    let body: string = ''
    blocks.keys().forEach(key => {
      const block = blocks.get(key)
      body += `/* START block ${block.offset} */`
      body += `${block.offset} [label=${this.buildLabel(block.operations)}]`
      body += this.buildRelations(block)
      body += `/* END block ${block.offset} */`
    })
    return body
  }

  private buildLabel(operations: Operation[]): string {
    let ops = '< <TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="4">'
    for (const op of operations) {
      ops += `<TR>`
      ops += `<TD ID="${op.offset.toString(16)}" HREF=" ">0x${op.offset.toString(16)}</TD><TD ID="${op.offset.toString(
        16
      )}" HREF=" ">${op.opcode.name}</TD>`
      if (op.opcode.name.startsWith('PUSH')) {
        ops += `<TD ID="${op.offset.toString(16)}" HREF=" ">0x${op.argument.toString(16)}</TD>`
      }
      ops += `</TR>`
    }
    ops += '</TABLE> >'
    return ops
  }

  private buildRelations(block: OperationBlock): string {
    let relations = ''
    if (block.childA) {
      relations += `${block.offset} -> ${block.childA} `
    }
    if (block.childB) {
      relations += `${block.offset} -> ${block.childB} `
    }
    return relations
  }
}
