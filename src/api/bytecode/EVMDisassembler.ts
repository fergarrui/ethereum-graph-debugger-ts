import { Disassembler } from './Disassembler'
import { Operation } from './Operation'
import { Opcodes } from './Opcodes'
import { injectable } from 'inversify'
import { BN } from 'bn.js'
import { Opcode } from './Opcode'
import { DisassembledContract } from './DisassembledContract'
let solc = require('solc')

@injectable()
export class EVMDisassembler implements Disassembler {
  readonly metadataPrefix = 'a165627a7a72305820'

  constructor() {}

  disassembleSourceCode(contractName: string, source: string): DisassembledContract {
    const compileJson = this.generateCompileObject(contractName, source)
    const compiledContract = JSON.parse(solc.compileStandardWrapper(JSON.stringify(compileJson)))
    const bytecode = compiledContract.contracts[contractName][contractName].evm.bytecode.object
    const asmRuntime = compiledContract.contracts[contractName][contractName].evm.legacyAssembly['.data'][0]['.code'].filter(elem => elem.name !== 'tag')
    const asmConstructor = compiledContract.contracts[contractName][contractName].evm.legacyAssembly['.code'].filter(elem => elem.name !== 'tag')
    const disassembledCode: DisassembledContract = this.disassembleContract(bytecode)
    return this.populateStartEnd(disassembledCode, asmRuntime, asmConstructor)
  }

  disassembleContract(bytecode: string): DisassembledContract {
    let code = bytecode

    if (bytecode.startsWith('0x')) {
      code = bytecode.slice(2)
    }

    if (code.length % 2 !== 0) {
      throw new Error(`Bad input, bytecode length not even: ${code}`)
    }

    const operations: Operation[] = this.disassembleBytecode(bytecode)
    const hasConstructor = operations.filter(op => op.opcode.name === 'CODECOPY').length > 0
    let constructor = []
    let runtime = operations
    if (hasConstructor) {
      const firstStopIndex = operations.findIndex(op => op.opcode.name === 'STOP')
      constructor = operations.slice(0, firstStopIndex + 1)
      runtime = this.adjustRuntimeOffset(operations.slice(firstStopIndex + 1, operations.length))
    }
    return {
      bytecode: bytecode,
      hasConstructor: hasConstructor,
      runtime: runtime,
      constructor: constructor
    } as DisassembledContract
  }

  disassembleBytecode(bytecode: string): Operation[] {
    let code = bytecode

    if (bytecode.startsWith('0x')) {
      code = bytecode.slice(2)
    }

    if (code.includes(this.metadataPrefix)) {
      code = code.split(this.metadataPrefix)[0]
    }

    if (code.length % 2 !== 0) {
      throw new Error(`Bad input, bytecode length not even: ${code}`)
    }
    let offset = 0
    const operations = code.match(/.{1,2}/g)
    const disassembledOperations: Operation[] = []

    for (let i = 0; i < operations.length; i++) {
      const code = operations[i]
      const opcode: Opcode = Opcodes.opcodes[parseInt(code, 16)] || Opcodes.opcodes[-1]
      if (this.isPush(opcode)) {
        const parameters = opcode.parameters
        const argument = `${operations.slice(i + 1, i + parameters + 1).join('')}`
        const operation = this.createOperation(offset, opcode, argument)
        disassembledOperations.push(operation)
        offset = offset + 1 + parameters
        i = i + parameters
      } else {
        const operation = this.createOperation(offset, opcode, '0')
        disassembledOperations.push(operation)
        offset++
      }
    }
    return disassembledOperations
  }

  private populateStartEnd(disassembledCode: DisassembledContract, asmRuntime, asmConstructor ): DisassembledContract {
    const constructor = disassembledCode.constructor
    const runtime = disassembledCode.runtime
    if (constructor.length !== asmConstructor.length + 1 || runtime.length !== asmRuntime.length + 1) {
      throw new Error('Source mappings do not match with bytecode')
    }

    if (disassembledCode.hasConstructor) {
      for (let i = 0; i < asmConstructor.length; i++) {
        const op = asmConstructor[i]
        constructor[i].begin = op.begin
        constructor[i].end = op.end
      }
    }

    for (let i = 0; i < asmRuntime.length; i++) {
      const op = asmRuntime[i]
      runtime[i].begin = op.begin
      runtime[i].end = op.end
    }

    return disassembledCode
  }

  private adjustRuntimeOffset(operations: Operation[]) {
    const firstOffset = operations[0].offset
    operations.forEach(op => (op.offset = op.offset - firstOffset))
    return operations
  }

  private createOperation(offset: number, opcode: Opcode, argument: string) {
    return {
      offset: offset,
      opcode: opcode,
      argument: new BN(argument, 16)
    } as Operation
  }

  private generateCompileObject(contractName: string, source: string) {
    const sources = {}
    sources[contractName] = {
      content: source
    }
    const compileJson = {
      language: 'Solidity',
      sources,
      settings: {
        outputSelection: {
          '*': {
            '*': ['evm.bytecode','evm.legacyAssembly']
          }
        }
      }
    }
    return compileJson
  }

  private isPush(opcode: Opcode): boolean {
    return opcode.name.startsWith('PUSH')
  }
}
