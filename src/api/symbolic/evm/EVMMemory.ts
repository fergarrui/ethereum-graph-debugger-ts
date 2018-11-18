import { Word } from './Word'
import { BN } from 'bn.js'

export class EVMMemory {
  memory: Buffer

  constructor(initialLength: number) {
    this.memory = Buffer.alloc(initialLength)
  }

  bufferLength(): number {
    return this.memory.length
  }

  writeWord(offset: number, word: Word) {
    while (offset + Word.WORD_LENGTH_IN_BYTES > this.memory.length) {
      this.increaseBufferLength(offset)
    }
    if (!word.isSymbolic) {
      const valueBuffer = word.value.toBuffer('be', Word.WORD_LENGTH_IN_BYTES)
      this.memory.fill(valueBuffer, offset, offset + valueBuffer.length)
    }
    // TODO handle symbolic values
  }

  writeByte(offset: number, word: Word) {
    while (offset + 1 > this.memory.length) {
      this.increaseBufferLength(offset)
    }
    if (!word.isSymbolic) {
      const mask = new BN('ff', 16)
      const valueLastByte = word.value.and(mask)
      const valueBuffer = valueLastByte.toBuffer('be', 1)
      this.memory.fill(valueBuffer, offset, offset + valueBuffer.length)
    }
    // TODO handle symbolic values
  }

  loadWord(offset: number): Word {
    const bytes = this.memory.slice(offset, Word.WORD_LENGTH_IN_BYTES)
    return {
      value: new BN(bytes.toString('hex'), 16),
      isSymbolic: false
    }
  }

  private increaseBufferLength(offset: number) {
    this.memory = Buffer.concat([this.memory, Buffer.alloc(this.memory.length)])
  }
}
