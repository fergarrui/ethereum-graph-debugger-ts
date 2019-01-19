import { TransactionService } from './TransactionService'
import { injectable, inject } from 'inversify'
import { TYPES } from '../../../inversify/types'
import { IWeb3 } from '../../blockchain/IWeb3'
import { TransactionReceipt } from '../bean/TransactionReceipt'
import { DebugTrace } from '../../symbolic/evm/DebugTrace'

@injectable()
export class TransactionServiceImpl implements TransactionService {
  web3

  constructor(@inject(TYPES.Web3Instance) private web3Instance: IWeb3) {
    this.web3 = this.web3Instance.getInstance()
  }

  async findTransactionReceipt(transactionHash: string): Promise<TransactionReceipt> {
    const receipt: TransactionReceipt = await this.web3.eth.getTransactionReceipt(transactionHash)
    return receipt
  }

  async findTransactionTrace(transactionHash: string, bytecode: string): Promise<DebugTrace> {
    const receipt: TransactionReceipt = await this.findTransactionReceipt(transactionHash)
    const toAddress = receipt.to
    const deployedBytecode = this.web3.getCode(toAddress)
    const trace: DebugTrace = await new Promise<DebugTrace>((resolve, reject) => {
      this.web3.currentProvider.send(
        {
          method: 'debug_traceTransaction',
          params: [transactionHash, {}],
          jsonrpc: '2.0',
          id: '2'
        },
        function(err, response) {
          if (!err) {
            resolve(response)
          } else {
            reject(err)
          }
        }
      )
    })
    return await this.findContractTraceDepth(bytecode, deployedBytecode, trace)
  }

  private async findContractTraceDepth(bytecode: string, deployedBytecode: string, trace: DebugTrace): Promise<DebugTrace> {
    if (bytecode === deployedBytecode) {
      return this.buildTrace(trace, trace.result.structLogs.filter(log => log.depth === 0))
    }
    const allCalls = trace.result.structLogs.filter(log => this.isCall(log.op))
    for (const call of allCalls) {
      const addressCalled = call.stack[call.stack.length-2]
    }
  }

  private buildTrace(trace: DebugTrace, logs: any) {
    return {
      id: trace.id,
      jsonrpc: trace.jsonrpc,
      result: {
        gas: trace.result.gas,
        returnValue: trace.result.returnValue,
        structLogs: logs
      }
    }
  }

  private isCall(op: string) {
    return op === 'CALL' || op === 'DELEGATECALL' || op === 'STATICCALL' || op === 'CALLCODE'
  }
}
