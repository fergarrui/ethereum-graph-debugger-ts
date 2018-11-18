import { Word } from './Word'

export class EVMStack {
  stack: Word[] = []

  push(word: Word) {
    this.stack.push(word)
  }

  pop(): Word {
    return this.stack.pop()
  }

  peek(): Word {
    return this.stack[this.stack.length - 1]
  }

  length(): number {
    return this.stack.length
  }
}
