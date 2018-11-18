import { EVMMemory } from './EVMMemory'
import { Word } from './Word'
import { BN } from 'bn.js'

describe('EVMMemory', () => {
  let memory: EVMMemory

  beforeEach(() => {
    memory = new EVMMemory(64)
  })

  it('Test initial length', () => {
    expect(memory.bufferLength()).toEqual(64)
  })

  it('Test write word', () => {
    memory.writeWord(0, createLiteralWord('99'))
    memory.writeWord(32, createLiteralWord('ff'))
    const memoryHex = memory.memory.toString('hex')
    const expectedMemory =
      '000000000000000000000000000000000000000000000000000000000000009900000000000000000000000000000000000000000000000000000000000000ff'
    expect(memoryHex).toEqual(expectedMemory)
  })

  it('Test write word ovewriting some', () => {
    memory.writeWord(0, createLiteralWord('1234'))
    memory.writeWord(31, createLiteralWord('9876'))
    const memoryHex = memory.memory.toString('hex')
    const expectedMemory =
      '00000000000000000000000000000000000000000000000000000000000012000000000000000000000000000000000000000000000000000000000000987600'
    expect(memoryHex).toEqual(expectedMemory)
  })

  it('Test write byte', () => {
    memory.writeByte(0, createLiteralWord('de'))
    memory.writeByte(1, createLiteralWord('ad'))
    memory.writeByte(63, createLiteralWord('ff'))
    const memoryHex = memory.memory.toString('hex')
    const expectedMemory =
      'dead00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000ff'
    expect(memoryHex).toEqual(expectedMemory)
  })

  it('Test write offset larger than current memory size', () => {
    memory.writeWord(33, createLiteralWord('1234'))
    const memoryHex = memory.memory.toString('hex')
    const expectedMemory =
      '0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001234000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
    expect(memory.bufferLength()).toEqual(128)
    expect(memoryHex).toEqual(expectedMemory)
  })

  it('Test write byte with offset larger than current memory size', () => {
    memory.writeByte(64, createLiteralWord('99'))
    const memoryHex = memory.memory.toString('hex')
    const expectedMemory =
      '0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000099000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000'
    expect(memory.bufferLength()).toEqual(128)
    expect(memoryHex).toEqual(expectedMemory)
  })

  it('Test load from memory', () => {
    const word = createLiteralWord('99')
    memory.writeWord(0, word)
    const loadedWord: Word = memory.loadWord(0)
    expect(memory.bufferLength()).toEqual(64)
    expect(word.value.eq(loadedWord.value))
  })

  function createLiteralWord(value: string): Word {
    return { isSymbolic: false, value: new BN(value, 16) }
  }
})
