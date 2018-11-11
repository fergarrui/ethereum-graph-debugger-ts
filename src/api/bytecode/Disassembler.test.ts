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
      { offset: 0, opcode: { name: 'AND', opcode: 0x16, parameters: 0}, argument: new BN(0)},
      { offset: 2, opcode: { name: 'OR', opcode: 0x17, parameters: 0}, argument: new BN(0)},
      { offset: 4, opcode: { name: 'XOR', opcode: 0x18, parameters: 0}, argument: new BN(0)}
    ]
    const opcodes = disass.disassemble(bytecode)
    expect(opcodes).toEqual(expectedOpcodes)
  })

  // it('Test disassembler bytecode', async() => {
  //   const bytecode = "60406080"
  //   const expectedOpcodes = [
  //     { offset: 0, opcode: { name: 'AND', opcode: 0x16, parameters: 0}, argument: new BN(0)},
  //     { offset: 2, opcode: { name: 'OR', opcode: 0x17, parameters: 0}, argument: new BN(0)},
  //     { offset: 4, opcode: { name: 'XOR', opcode: 0x18, parameters: 0}, argument: new BN(0)}
  //   ]
  //   const opcodes = disass.disassemble(bytecode)
  //   expect(opcodes).toEqual(expectedOpcodes)
  // })

  it('Test odd disassembler bytecode', async() => {
    const bytecode = "0x16171"
    expect(() => disass.disassemble(bytecode)).toThrow()
  })
})
