import 'reflect-metadata'
import { Disassembler } from './Disassembler';
import { EVMDisassembler } from './EVMDisassembler';
import { Opcodes } from './Opcodes';
import { BN } from 'bn.js'

describe("Disassembler test", () => {

  let disass: Disassembler

  beforeEach(() => {
    disass = new EVMDisassembler(new Opcodes())
  })

  it('Test disassembler bytecode', async() => {
    const bytecode = "0x161718"
    const expectedOpcodes = [
      { offset: 0, opcode: { name: 'AND', opcode: 0x16, parameters: 0}, argument: new BN('0', 16)},
      { offset: 1, opcode: { name: 'OR', opcode: 0x17, parameters: 0}, argument: new BN('0', 16)},
      { offset: 2, opcode: { name: 'XOR', opcode: 0x18, parameters: 0}, argument: new BN('0', 16)}
    ]
    const opcodes = disass.disassemble(bytecode)
    expect(opcodes).toEqual(expectedOpcodes)
  })

  it('Test disassembler bytecode with push1', async() => {
    const bytecode = "60406080"
    const expectedOpcodes = [
      { offset: 0, opcode: { name: 'PUSH1', opcode: 0x60, parameters: 1}, argument: new BN(`40`, 16)},
      { offset: 2, opcode: { name: 'PUSH1', opcode: 0x60, parameters: 1}, argument: new BN(`80`, 16)},
    ]
    const opcodes = disass.disassemble(bytecode)
    expect(opcodes).toEqual(expectedOpcodes)
  })


  it('Test disassembler bytecode with push1 starting with 0x', async() => {
    const bytecode = "0x60406080"
    const expectedOpcodes = [
      { offset: 0, opcode: { name: 'PUSH1', opcode: 0x60, parameters: 1}, argument: new BN(`40`, 16)},
      { offset: 2, opcode: { name: 'PUSH1', opcode: 0x60, parameters: 1}, argument: new BN(`80`, 16)},
    ]
    const opcodes = disass.disassemble(bytecode)
    expect(opcodes).toEqual(expectedOpcodes)
  })

  it('Test combined contract runtime init', () => {
    const bytecode = "0x608060405260043610610041576000357c010000000000000000000000000000000000000000000000000000000090"
    const expectedOpcodes = [
      { offset: 0, opcode: { name: 'PUSH1', opcode: 0x60, parameters: 1}, argument: new BN(`80`, 16)},
      { offset: 2, opcode: { name: 'PUSH1', opcode: 0x60, parameters: 1}, argument: new BN(`40`, 16)},
      { offset: 4, opcode: { name: 'MSTORE', opcode: 0x52, parameters: 0}, argument: new BN(`0`, 16)},
      { offset: 5, opcode: { name: 'PUSH1', opcode: 0x60, parameters: 1}, argument: new BN(`04`, 16)},
      { offset: 7, opcode: { name: 'CALLDATASIZE', opcode: 0x36, parameters: 0}, argument: new BN(`0`, 16)},
      { offset: 8, opcode: { name: 'LT', opcode: 0x10, parameters: 0}, argument: new BN(`0`, 16)},
      { offset: 9, opcode: { name: 'PUSH2', opcode: 0x61, parameters: 2}, argument: new BN(`0041`, 16)},
      { offset: 12, opcode: { name: 'JUMPI', opcode: 0x57, parameters: 0}, argument: new BN(`0`, 16)},
      { offset: 13, opcode: { name: 'PUSH1', opcode: 0x60, parameters: 1}, argument: new BN(`0`, 16)},
      { offset: 15, opcode: { name: 'CALLDATALOAD', opcode: 0x35, parameters: 0}, argument: new BN(`0`, 16)},
      { offset: 16, opcode: { name: 'PUSH29', opcode: 0x7c, parameters: 29}, argument: new BN(`0100000000000000000000000000000000000000000000000000000000`, 16)},
      { offset: 46, opcode: { name: 'SWAP1', opcode: 0x90, parameters: 0}, argument: new BN(`0`, 16)},
    ]
    const opcodes = disass.disassemble(bytecode)
    expect(opcodes).toEqual(expectedOpcodes)
  })

  it('Test odd disassembler bytecode', async() => {
    const bytecode = "0x16171"
    expect(() => disass.disassemble(bytecode)).toThrow()
  })
})
