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
import { Return } from './Return'
import { Lt } from './Lt'
import { Calldataload } from './Calldataload'
import { Swap } from './Swap'
import { And } from './And'
import { Eq } from './Eq'
import { Or } from './Or'
import { Not } from './Not'
import { Xor } from './Xor'
import { Address } from './Address'
import { Balance } from './Balance'
import { Origin } from './Origin'
import { Caller } from './Caller'
import { Calldatacopy } from './Calldatacopy'
import { Codesize } from './Codesize'
import { Codecopy } from './Codecopy'
import { Gasprice } from './Gasprice'
import { Extcodesize } from './Extcodesize'
import { Extcodecopy } from './Extcodecopy'
import { Sstore } from './Sstore'
import { Sload } from './Sload'
import { MLoad } from './MLoad'
import { Sdiv } from './Sdiv';
import { Mod } from './Mod';
import { Smod } from './Smod';
import { Addmod } from './Addmod';
import { Mulmod } from './Mulmod';

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

    this.ops['SWAP1'] = new Swap()
    this.ops['SWAP2'] = new Swap()
    this.ops['SWAP3'] = new Swap()
    this.ops['SWAP4'] = new Swap()
    this.ops['SWAP5'] = new Swap()
    this.ops['SWAP6'] = new Swap()
    this.ops['SWAP7'] = new Swap()
    this.ops['SWAP8'] = new Swap()
    this.ops['SWAP9'] = new Swap()
    this.ops['SWAP10'] = new Swap()
    this.ops['SWAP11'] = new Swap()
    this.ops['SWAP12'] = new Swap()
    this.ops['SWAP13'] = new Swap()
    this.ops['SWAP14'] = new Swap()
    this.ops['SWAP15'] = new Swap()
    this.ops['SWAP16'] = new Swap()

    this.ops['JUMPI'] = new Jumpi()
    this.ops['JUMP'] = new Jump()

    this.ops['RETURN'] = new Return()

    this.ops['POP'] = new Pop()
    this.ops['ADD'] = new Add()
    this.ops['SUB'] = new Sub()
    this.ops['MUL'] = new Mul()
    this.ops['DIV'] = new Div()
    this.ops['SDIV'] = new Sdiv()
    this.ops['MOD'] = new Mod()
    this.ops['SMOD'] = new Smod()
    this.ops['ADDMOD'] = new Addmod()
    this.ops['MULMOD'] = new Mulmod()
    this.ops['AND'] = new And()
    this.ops['OR'] = new Or()
    this.ops['XOR'] = new Xor()
    this.ops['NOT'] = new Not()

    this.ops['SSTORE'] = new Sstore()
    this.ops['SLOAD'] = new Sload()
    this.ops['MSTORE'] = new MStore()
    this.ops['MSTORE8'] = new MStore8()
    this.ops['MLOAD'] = new MLoad()

    this.ops['ISZERO'] = new IsZero()
    this.ops['LT'] = new Lt()
    this.ops['EQ'] = new Eq()

    // Symbolic opcodes
    this.ops['ADDRESS'] = new Address()
    this.ops['ORIGIN'] = new Origin()
    this.ops['CALLER'] = new Caller()
    this.ops['BALANCE'] = new Balance()
    this.ops['CALLVALUE'] = new Callvalue()
    this.ops['CALLDATALOAD'] = new Calldataload()
    this.ops['CALLDATASIZE'] = new Calldatasize()
    this.ops['CALLDATACOPY'] = new Calldatacopy()
    this.ops['CODESIZE'] = new Codesize()
    this.ops['CODECOPY'] = new Codecopy()
    this.ops['GASPRICE'] = new Gasprice()
    this.ops['EXTCODESIZE'] = new Extcodesize()
    this.ops['EXTCODECOPY'] = new Extcodecopy()

    // Those are NOP's for now
    this.ops['REVERT'] = new Nop()
    this.ops['JUMPDEST'] = new Nop()
    this.ops['STOP'] = new Nop()
    this.ops['INVALID'] = new Nop()
  }
}
