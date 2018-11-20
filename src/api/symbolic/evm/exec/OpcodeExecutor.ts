import { Push } from './Push'
import { Pop } from './Pop'
import { injectable } from 'inversify'
import { Dup } from './Dup'
import { MStore } from './MStore'
import { MStore8 } from './Mstore8'
import { IsZero } from './IsZero'
import { Callvalue } from './Callvalue'
import { Nop } from './Nop'
import { Calldatasize } from './Calldatasize'
import { Jumpi } from './Jumpi'
import { Jump } from './Jump'
import { Add } from './Add'
import { Sub } from './Sub'
import { Mul } from './Mul'
import { Div } from './Div'
import { Return } from './Return';
import { Lt } from './Lt';
import { Calldataload } from './Calldataload';

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

    this.ops['DUP1'] = new Dup()
    this.ops['DUP2'] = new Dup()
    this.ops['DUP3'] = new Dup()
    this.ops['DUP4'] = new Dup()
    this.ops['DUP5'] = new Dup()
    this.ops['DUP6'] = new Dup()
    this.ops['DUP7'] = new Dup()
    this.ops['DUP8'] = new Dup()
    this.ops['DUP9'] = new Dup()
    this.ops['DUP10'] = new Dup()
    this.ops['DUP11'] = new Dup()
    this.ops['DUP12'] = new Dup()
    this.ops['DUP13'] = new Dup()
    this.ops['DUP14'] = new Dup()
    this.ops['DUP15'] = new Dup()
    this.ops['DUP16'] = new Dup()

    this.ops['JUMPI'] = new Jumpi()
    this.ops['JUMP'] = new Jump()

    this.ops['RETURN'] = new Return()

    this.ops['POP'] = new Pop()
    this.ops['ISZERO'] = new IsZero()
    this.ops['ADD'] = new Add()
    this.ops['SUB'] = new Sub()
    this.ops['MUL'] = new Mul()
    this.ops['DIV'] = new Div()
    this.ops['LT'] = new Lt()
    this.ops['MSTORE'] = new MStore()
    this.ops['MSTORE8'] = new MStore8()

    // Symbolic opcodes
    this.ops['CALLVALUE'] = new Callvalue()
    this.ops['CALLDATASIZE'] = new Calldatasize()
    this.ops['CALLDATALOAD'] = new Calldataload()

    // Those are NOP's for now
    this.ops['REVERT'] = new Nop()
    this.ops['JUMPDEST'] = new Nop()
    this.ops['CODECOPY'] = new Nop()
    this.ops['STOP'] = new Nop()
    this.ops['INVALID'] = new Nop()
  }
}
