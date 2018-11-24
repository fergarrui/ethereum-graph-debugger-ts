import { Route, Path, Controller, Get, Post } from 'tsoa'
import { provideSingleton, inject } from '../../../inversify/ioc'
import { TYPES } from '../../../inversify/types'
import { TransactionService } from '../service/TransactionService'
import { TransactionReceipt } from '../bean/TransactionReceipt'
import { TransactionTrace } from '../response/TransactionTrace';

@Route('debug')
@provideSingleton(DebuggerController)
export class DebuggerController extends Controller {
  constructor(@inject(TYPES.TransactionService) private transactionService: TransactionService) {
    super()
  }

  @Get('receipt/{tx}')
  async debugTransaction(@Path() tx: string): Promise<TransactionReceipt> {
    return this.transactionService.findTransactionReceipt(tx)
  }

  @Get('trace/{tx}')
  async getTransactionTrace(@Path() tx: string): Promise<TransactionTrace> {
    return this.transactionService.findTransactionTrace(tx)
  }
}
