import 'reflect-metadata'
import { EthereumCFGCreator } from "./EthereumCFGCreator";
import { EVMDisassembler } from "../bytecode/EVMDisassembler";
import { Opcodes } from "../bytecode/Opcodes";
import { Disassembler } from "../bytecode/Disassembler";
import { Operation } from "../bytecode/Operation";
import { OperationBlock } from "./OperationBlock";
import { BN } from 'bn.js'

describe('EthereumCFGCreator', () => {

  const ops: Opcodes = new Opcodes
  let cfgCreator: EthereumCFGCreator
  let disassembler: Disassembler

  beforeEach(() => {
    cfgCreator = new EthereumCFGCreator()
    disassembler = new EVMDisassembler(ops)
  })

  it('Test blocks correctly created, no jumps', () => {
    const bytecode = '60806040'
    const ops: Operation[] = disassembler.disassembleBytecode(bytecode)
    const cfg: OperationBlock[] = cfgCreator.createCFG(ops)
    const expectedBlocks: OperationBlock[] = [
      {
        offset: 0,
        operations: [
          {
            offset: 0,
            argument: new BN('80', 16),
            opcode: {
              name: 'PUSH1',
              opcode: 0x60,
              parameters: 1
            }
          },
          {
            offset: 2,
            argument: new BN('40', 16),
            opcode: {
              name: 'PUSH1',
              opcode: 0x60,
              parameters: 1
            }
          }
        ]
      }
    ]
    expect(cfg.length).toEqual(1)
    expect(cfg).toEqual(expectedBlocks)
  })

  it('Test blocks correctly created, JUMP', () => {
    const bytecode = '60806040565b5050'
    const ops: Operation[] = disassembler.disassembleBytecode(bytecode)
    const cfg: OperationBlock[] = cfgCreator.createCFG(ops)
    const expectedBlocks: OperationBlock[] = [
      {
        offset: 0,
        operations: [
          {
            offset: 0,
            argument: new BN('80', 16),
            opcode: {
              name: 'PUSH1',
              opcode: 0x60,
              parameters: 1
            }
          },
          {
            offset: 2,
            argument: new BN('40', 16),
            opcode: {
              name: 'PUSH1',
              opcode: 0x60,
              parameters: 1
            }
          },
          {
            offset: 4,
            argument: new BN('0', 16),
            opcode: {
              name: 'JUMP',
              opcode: 0x56,
              parameters: 0
            }
          }
        ]
      },
      {
        offset: 5,
        operations: [
          {
            offset: 5,
            argument: new BN('0', 16),
            opcode: {
              name: 'JUMPDEST',
              opcode: 0x5b,
              parameters: 0
            }
          },
          {
            offset: 6,
            argument: new BN('0', 16),
            opcode: {
              name: 'POP',
              opcode: 0x50,
              parameters: 0
            }
          },
          {
            offset: 7,
            argument: new BN('0', 16),
            opcode: {
              name: 'POP',
              opcode: 0x50,
              parameters: 0
            }
          }
        ]
      }
    ]
    expect(cfg.length).toEqual(2)
    expect(cfg).toEqual(expectedBlocks)
  })
})
