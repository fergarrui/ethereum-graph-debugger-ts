import { EVMStack } from "./EVMStack";
import { createLiteralWord } from "./exec/TestUtils";

describe('EVMStack', () => {
  
  let stack: EVMStack

  beforeEach(() => {
    stack = new EVMStack()
  })

  it('test push', () => {
    stack.push(createLiteralWord('80'))
    stack.push(createLiteralWord('81'))
    expect(stack.length()).toEqual(2)
  })

  it('Test pop', () => {
    stack.push(createLiteralWord('80'))
    stack.push(createLiteralWord('81'))
    const pop = stack.pop()
    expect(pop).toEqual(createLiteralWord('81'))
    expect(stack.length()).toEqual(1)
  })

  it('Test peek', () => {
    stack.push(createLiteralWord('80'))
    stack.push(createLiteralWord('81'))
    const pop = stack.peek()
    expect(pop).toEqual(createLiteralWord('81'))
    expect(stack.length()).toEqual(2)
  })

  it('Test get', () => {
    stack.push(createLiteralWord('80'))
    stack.push(createLiteralWord('81'))
    stack.push(createLiteralWord('82'))
    const get0 = stack.get(0)
    const get1 = stack.get(1)
    const get2 = stack.get(2)
    expect(get0).toEqual(createLiteralWord('82'))
    expect(get1).toEqual(createLiteralWord('81'))
    expect(get2).toEqual(createLiteralWord('80'))
    expect(stack.length()).toEqual(3)
  })
})
