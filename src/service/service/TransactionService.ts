import { TransactionReceipt } from "../bean/TransactionReceipt";

export interface TransactionService {
  findTransactionReceipt(transactionHash: string): Promise<TransactionReceipt>
}