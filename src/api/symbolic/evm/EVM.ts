import { EVMStack } from './EVMStack'
import { EVMStorage } from './EVMStorage'

export class EVM {
  stack: EVMStack
  storage: EVMStorage

  constructor() {
    this.stack = new EVMStack()
    this.storage = new EVMStorage()
  }
}
