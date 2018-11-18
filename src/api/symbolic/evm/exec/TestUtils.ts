import { Disassembler } from "../../../bytecode/Disassembler";
import { Word } from "../Word";
import { BN } from "bn.js";
import { EthereumCFGCreator } from "../../../cfg/EthereumCFGCreator";
import { OpcodeExecutor } from "./OpcodeExecutor";
import { Operation } from "../../../bytecode/Operation";
import { CFGBlocks } from "../../../cfg/CFGBlocks";
import { EVMExecutor } from "../EVMExecutor";

export function createLiteralWord(value: string): Word {
  return { isSymbolic: false, value: new BN(value, 16) }
}

export function createExecutor(
  disassembler: Disassembler,
  bytecode: string,
  cfgCreator: EthereumCFGCreator,
  opcodeExecutor: OpcodeExecutor
) {
  const ops: Operation[] = disassembler.disassembleBytecode(bytecode)
  const blocks: CFGBlocks = cfgCreator.divideBlocks(ops)
  return new EVMExecutor(blocks, opcodeExecutor)
}
