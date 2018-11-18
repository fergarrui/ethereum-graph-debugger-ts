import { EVMStack } from './EVMStack'
import { EVMStorage } from './EVMStorage'
import { EVMMemory } from './EVMMemory';

export class EVM {
  stack: EVMStack
  storage: EVMStorage
  memory: EVMMemory

  constructor() {
    this.stack = new EVMStack()
    this.storage = new EVMStorage()
    this.memory = new EVMMemory(64)
  }
}
