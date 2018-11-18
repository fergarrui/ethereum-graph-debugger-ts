import { EVMStack } from './EVMStack'
import { Word } from './Word'

describe('EVMStack', () => {
  let stack: EVMStack

  beforeEach(() => {
    stack = new EVMStack()
  })

  it('test push', () => {
    stack.push(Word.createLiteral('80'))
    stack.push(Word.createLiteral('81'))
    expect(stack.length()).toEqual(2)
  })

  it('Test pop', () => {
    stack.push(Word.createLiteral('80'))
    stack.push(Word.createLiteral('81'))
    const pop = stack.pop()
    expect(pop).toEqual(Word.createLiteral('81'))
    expect(stack.length()).toEqual(1)
  })

  it('Test peek', () => {
    stack.push(Word.createLiteral('80'))
    stack.push(Word.createLiteral('81'))
    const pop = stack.peek()
    expect(pop).toEqual(Word.createLiteral('81'))
    expect(stack.length()).toEqual(2)
  })

  it('Test get', () => {
    stack.push(Word.createLiteral('80'))
    stack.push(Word.createLiteral('81'))
    stack.push(Word.createLiteral('82'))
    const get0 = stack.get(0)
    const get1 = stack.get(1)
    const get2 = stack.get(2)
    expect(get0).toEqual(Word.createLiteral('82'))
    expect(get1).toEqual(Word.createLiteral('81'))
    expect(get2).toEqual(Word.createLiteral('80'))
    expect(stack.length()).toEqual(3)
  })
})
