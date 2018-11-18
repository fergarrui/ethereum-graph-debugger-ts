import 'reflect-metadata'
import { EVMExecutor } from './EVMExecutor'
import { EthereumCFGCreator } from '../../cfg/EthereumCFGCreator'
import { Disassembler } from '../../bytecode/Disassembler'
import { EVMDisassembler } from '../../bytecode/EVMDisassembler'
import { Operation } from '../../bytecode/Operation'
import { CFGBlocks } from '../../cfg/CFGBlocks'
import { OpcodeExecutor } from './exec/OpcodeExecutor'
import { Word } from './Word'
import { BN } from 'bn.js'

describe('EVMExecutor', () => {
  let cfgCreator: EthereumCFGCreator
  let disassembler: Disassembler
  let opcodeExecutor: OpcodeExecutor = new OpcodeExecutor()

  beforeEach(() => {
    cfgCreator = new EthereumCFGCreator()
    disassembler = new EVMDisassembler()
  })

  it('Test simple PUSH execution', () => {
    const bytecode = '60406080'
    const executor: EVMExecutor = createExecutor(disassembler, bytecode, cfgCreator, opcodeExecutor)
    executor.run(0)
    const expectedWord1: Word = createLiteralWord('40')
    const expectedWord2: Word = createLiteralWord('80')
    expect(executor.evm.stack.stack).toContainEqual(expectedWord1)
    expect(executor.evm.stack.stack).toContainEqual(expectedWord2)
    expect(executor.evm.stack.length()).toEqual(2)
    expect(executor.blocks.length()).toEqual(1)
    expect(executor.blocks.keys()).toEqual([0])
  })

  it('Test simple PUSH with POP execution', () => {
    const bytecode = '6040608050'
    const executor: EVMExecutor = createExecutor(disassembler, bytecode, cfgCreator, opcodeExecutor)
    executor.run(0)
    const expectedWord1: Word = createLiteralWord('40')
    expect(executor.evm.stack.stack).toContainEqual(expectedWord1)
    expect(executor.evm.stack.length()).toEqual(1)
    expect(executor.blocks.length()).toEqual(1)
    expect(executor.blocks.keys()).toEqual([0])
  })
})

function createLiteralWord(value: string): Word {
  return { isSymbolic: false, value: new BN(value, 16) }
}

function createExecutor(
  disassembler: Disassembler,
  bytecode: string,
  cfgCreator: EthereumCFGCreator,
  opcodeExecutor: OpcodeExecutor
) {
  const ops: Operation[] = disassembler.disassembleBytecode(bytecode)
  const blocks: CFGBlocks = cfgCreator.divideBlocks(ops)
  return new EVMExecutor(blocks, opcodeExecutor)
}
