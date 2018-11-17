import 'reflect-metadata'
import { EthereumCFGCreator } from './EthereumCFGCreator'
import { EVMDisassembler } from '../bytecode/EVMDisassembler'
import { Disassembler } from '../bytecode/Disassembler'
import { Operation } from '../bytecode/Operation'
import { OperationBlock } from './OperationBlock'
import { BN } from 'bn.js'
import { Opcodes } from '../bytecode/Opcodes'
import { CFGBlocks } from './CFGBlocks'

describe('EthereumCFGCreator', () => {
  let cfgCreator: EthereumCFGCreator
  let disassembler: Disassembler

  beforeEach(() => {
    cfgCreator = new EthereumCFGCreator()
    disassembler = new EVMDisassembler()
  })

  it.only('Test blocks correctly created, no jumps', () => {
    const bytecode = '60806040'
    const ops: Operation[] = disassembler.disassembleBytecode(bytecode)
    const cfg: CFGBlocks = cfgCreator.divideBlocks(ops)
    const expectedBlocks: CFGBlocks = new CFGBlocks()
    expectedBlocks.push(
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
      },
      0
    )
    expect(cfg.length()).toEqual(1)
    expect(cfg).toEqual(expectedBlocks)
  })

  it('Test blocks correctly created, JUMP', () => {
    const bytecode = '60806040565b5050'
    const ops: Operation[] = disassembler.disassembleBytecode(bytecode)
    const cfg: CFGBlocks = cfgCreator.divideBlocks(ops)
    const expectedBlocks: OperationBlock[] = [
      {
        offset: 0,
        operations: [
          {
            offset: 0,
            argument: new BN('80', 16),
            opcode: Opcodes.opcodes['PUSH1']
          },
          {
            offset: 2,
            argument: new BN('40', 16),
            opcode: Opcodes.opcodes['PUSH1']
          },
          {
            offset: 4,
            argument: new BN('0', 16),
            opcode: Opcodes.opcodes['JUMP']
          }
        ]
      },
      {
        offset: 5,
        operations: [
          {
            offset: 5,
            argument: new BN('0', 16),
            opcode: Opcodes.opcodes['JUMPDEST']
          },
          {
            offset: 6,
            argument: new BN('0', 16),
            opcode: Opcodes.opcodes['POP']
          },
          {
            offset: 7,
            argument: new BN('0', 16),
            opcode: Opcodes.opcodes['POP']
          }
        ]
      }
    ]
    expect(cfg.length).toEqual(2)
    expect(cfg).toEqual(expectedBlocks)
  })

  it('Test blocks correctly created, JUMPI', () => {
    const bytecode = '60806040575b5050'
    const ops: Operation[] = disassembler.disassembleBytecode(bytecode)
    const cfg: CFGBlocks = cfgCreator.divideBlocks(ops)
    const expectedBlocks: OperationBlock[] = [
      {
        offset: 0,
        operations: [
          {
            offset: 0,
            argument: new BN('80', 16),
            opcode: Opcodes.opcodes['PUSH1']
          },
          {
            offset: 2,
            argument: new BN('40', 16),
            opcode: Opcodes.opcodes['PUSH1']
          },
          {
            offset: 4,
            argument: new BN('0', 16),
            opcode: Opcodes.opcodes['JUMPI']
          }
        ]
      },
      {
        offset: 5,
        operations: [
          {
            offset: 5,
            argument: new BN('0', 16),
            opcode: Opcodes.opcodes['JUMPDEST']
          },
          {
            offset: 6,
            argument: new BN('0', 16),
            opcode: Opcodes.opcodes['POP']
          },
          {
            offset: 7,
            argument: new BN('0', 16),
            opcode: Opcodes.opcodes['POP']
          }
        ]
      }
    ]
    expect(cfg.length).toEqual(2)
    expect(cfg).toEqual(expectedBlocks)
  })

  it('Test blocks correctly created, STOP', () => {
    const bytecode = '60806040005050'
    const ops: Operation[] = disassembler.disassembleBytecode(bytecode)
    const cfg: CFGBlocks = cfgCreator.divideBlocks(ops)
    const expectedBlocks: OperationBlock[] = [
      {
        offset: 0,
        operations: [
          {
            offset: 0,
            argument: new BN('80', 16),
            opcode: Opcodes.opcodes['PUSH1']
          },
          {
            offset: 2,
            argument: new BN('40', 16),
            opcode: Opcodes.opcodes['PUSH1']
          },
          {
            offset: 4,
            argument: new BN('0', 16),
            opcode: Opcodes.opcodes['STOP']
          }
        ]
      },
      {
        offset: 5,
        operations: [
          {
            offset: 5,
            argument: new BN('0', 16),
            opcode: Opcodes.opcodes['POP']
          },
          {
            offset: 6,
            argument: new BN('0', 16),
            opcode: Opcodes.opcodes['POP']
          }
        ]
      }
    ]
    expect(cfg.length).toEqual(2)
    expect(cfg).toEqual(expectedBlocks)
  })

  it('Test blocks correctly created, RETURN', () => {
    const bytecode = '60806040f35050'
    const ops: Operation[] = disassembler.disassembleBytecode(bytecode)
    const cfg: CFGBlocks = cfgCreator.divideBlocks(ops)
    const expectedBlocks: OperationBlock[] = [
      {
        offset: 0,
        operations: [
          {
            offset: 0,
            argument: new BN('80', 16),
            opcode: Opcodes.opcodes['PUSH1']
          },
          {
            offset: 2,
            argument: new BN('40', 16),
            opcode: Opcodes.opcodes['PUSH1']
          },
          {
            offset: 4,
            argument: new BN('0', 16),
            opcode: Opcodes.opcodes['RETURN']
          }
        ]
      },
      {
        offset: 5,
        operations: [
          {
            offset: 5,
            argument: new BN('0', 16),
            opcode: Opcodes.opcodes['POP']
          },
          {
            offset: 6,
            argument: new BN('0', 16),
            opcode: Opcodes.opcodes['POP']
          }
        ]
      }
    ]
    expect(cfg.length).toEqual(2)
    expect(cfg).toEqual(expectedBlocks)
  })

  it('Test blocks correctly created, REVERT', () => {
    const bytecode = '60806040fd5050'
    const ops: Operation[] = disassembler.disassembleBytecode(bytecode)
    const cfg: CFGBlocks = cfgCreator.divideBlocks(ops)
    const expectedBlocks: OperationBlock[] = [
      {
        offset: 0,
        operations: [
          {
            offset: 0,
            argument: new BN('80', 16),
            opcode: Opcodes.opcodes['PUSH1']
          },
          {
            offset: 2,
            argument: new BN('40', 16),
            opcode: Opcodes.opcodes['PUSH1']
          },
          {
            offset: 4,
            argument: new BN('0', 16),
            opcode: Opcodes.opcodes['REVERT']
          }
        ]
      },
      {
        offset: 5,
        operations: [
          {
            offset: 5,
            argument: new BN('0', 16),
            opcode: Opcodes.opcodes['POP']
          },
          {
            offset: 6,
            argument: new BN('0', 16),
            opcode: Opcodes.opcodes['POP']
          }
        ]
      }
    ]
    expect(cfg.length).toEqual(2)
    expect(cfg).toEqual(expectedBlocks)
  })

  it('Test blocks correctly created, INVALID', () => {
    const bytecode = '60806040fe5050'
    const ops: Operation[] = disassembler.disassembleBytecode(bytecode)
    const cfg: CFGBlocks = cfgCreator.divideBlocks(ops)
    const expectedBlocks: OperationBlock[] = [
      {
        offset: 0,
        operations: [
          {
            offset: 0,
            argument: new BN('80', 16),
            opcode: Opcodes.opcodes['PUSH1']
          },
          {
            offset: 2,
            argument: new BN('40', 16),
            opcode: Opcodes.opcodes['PUSH1']
          },
          {
            offset: 4,
            argument: new BN('0', 16),
            opcode: Opcodes.opcodes['INVALID']
          }
        ]
      },
      {
        offset: 5,
        operations: [
          {
            offset: 5,
            argument: new BN('0', 16),
            opcode: Opcodes.opcodes['POP']
          },
          {
            offset: 6,
            argument: new BN('0', 16),
            opcode: Opcodes.opcodes['POP']
          }
        ]
      }
    ]
    expect(cfg.length).toEqual(2)
    expect(cfg).toEqual(expectedBlocks)
  })
})
