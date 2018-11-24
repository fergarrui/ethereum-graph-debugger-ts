import { TransactionReceipt } from '../bean/TransactionReceipt'
import { TransactionTrace } from '../response/TransactionTrace';

export interface TransactionService {
  findTransactionReceipt(transactionHash: string): Promise<TransactionReceipt>
  findTransactionTrace(transactionHash: string): Promise<TransactionTrace>
}
