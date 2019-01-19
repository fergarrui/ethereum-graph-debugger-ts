import { TransactionReceipt } from '../bean/TransactionReceipt'
import { DebugTrace } from '../../symbolic/evm/DebugTrace'

export interface TransactionService {
  findTransactionReceipt(transactionHash: string): Promise<TransactionReceipt>
  findTransactionTrace(transactionHash: string, bytecode: string): Promise<DebugTrace>
}
