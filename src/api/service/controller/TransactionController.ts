import { Route, Path, Controller, Get, Post } from 'tsoa'
import { provideSingleton, inject } from '../../../inversify/ioc'
import { TYPES } from '../../../inversify/types'
import { TransactionService } from '../service/TransactionService'
import { TransactionReceipt } from '../bean/TransactionReceipt'
import { DebugTrace } from '../../symbolic/evm/DebugTrace'

@Route('tx')
@provideSingleton(TransactionController)
export class TransactionController extends Controller {
  constructor(@inject(TYPES.TransactionService) private transactionService: TransactionService) {
    super()
  }

  @Get('{tx}/receipt')
  async getReceipt(@Path() tx: string): Promise<TransactionReceipt> {
    return this.transactionService.findTransactionReceipt(tx)
  }

  @Get('{tx}/trace')
  async getTransactionTrace(@Path() tx: string): Promise<DebugTrace> {
    return this.transactionService.findTransactionTrace(tx, 'asd')
  }
}
