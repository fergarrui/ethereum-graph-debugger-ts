import { Opcodes } from '../../../bytecode/Opcodes'
import { Push } from './Push'
import { Pop } from './Pop'
import { injectable } from 'inversify'

@injectable()
export class OpcodeExecutor {
  ops = {}

  constructor() {
    this.ops['PUSH1'] = new Push()
    this.ops['PUSH2'] = new Push()
    this.ops['PUSH3'] = new Push()
    this.ops['PUSH4'] = new Push()
    this.ops['PUSH5'] = new Push()
    this.ops['PUSH6'] = new Push()
    this.ops['PUSH7'] = new Push()
    this.ops['PUSH8'] = new Push()
    this.ops['PUSH9'] = new Push()
    this.ops['PUSH10'] = new Push()
    this.ops['PUSH11'] = new Push()
    this.ops['PUSH12'] = new Push()
    this.ops['PUSH13'] = new Push()
    this.ops['PUSH14'] = new Push()
    this.ops['PUSH15'] = new Push()
    this.ops['PUSH16'] = new Push()
    this.ops['PUSH17'] = new Push()
    this.ops['PUSH18'] = new Push()
    this.ops['PUSH19'] = new Push()
    this.ops['PUSH20'] = new Push()
    this.ops['PUSH21'] = new Push()
    this.ops['PUSH22'] = new Push()
    this.ops['PUSH23'] = new Push()
    this.ops['PUSH24'] = new Push()
    this.ops['PUSH25'] = new Push()
    this.ops['PUSH26'] = new Push()
    this.ops['PUSH27'] = new Push()
    this.ops['PUSH28'] = new Push()
    this.ops['PUSH29'] = new Push()
    this.ops['PUSH30'] = new Push()
    this.ops['PUSH31'] = new Push()
    this.ops['PUSH32'] = new Push()
    this.ops['POP'] = new Pop()
  }
}
