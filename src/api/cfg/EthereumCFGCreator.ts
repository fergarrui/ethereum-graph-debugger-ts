import { CFGCreator } from "./CFGCreator";
import { injectable } from "inversify";
import { Operation } from "../bytecode/Operation";
import { OperationBlock } from "./OperationBlock";

@injectable()
export class EthereumCFGCreator implements CFGCreator {

  private readonly blockEnd = ['JUMPI', 'JUMP', 'STOP', 'REVERT', 'RETURN', 'INVALID']

  createCFG(ops: Operation[]): OperationBlock[] {
    const blocks: OperationBlock[] = []
    let startIndex = 0
    for (let i = 0; i < ops.length; i++) {
      const op = ops[i]
      if (this.blockEnd.includes(op.opcode.name) || i === ops.length - 1) {
        this.addNewBlock(ops, startIndex, i, blocks);
        startIndex = i + 1
      }
    }
    return blocks
  }

  private addNewBlock(ops: Operation[], startIndex: number, i: number, blocks: OperationBlock[]) {
    const newBlockOps = ops.slice(startIndex, i + 1);
    const firstBlockOp = newBlockOps[0];
    const newBlock: OperationBlock = {
      offset: firstBlockOp.offset,
      operations: newBlockOps
    };
    blocks.push(newBlock);
  }
}
