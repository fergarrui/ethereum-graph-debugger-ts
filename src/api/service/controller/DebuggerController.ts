import { Route, Path, Controller, Get, Post } from "tsoa";
import { provideSingleton, inject } from "../../../inversify/ioc";
import { TYPES } from "../../../inversify/types";
import { TransactionService } from "../service/TransactionService";
import { TransactionReceipt } from "../bean/TransactionReceipt";

@Route('debug')
@provideSingleton(DebuggerController)
export class DebuggerController extends Controller {
  
  constructor(
    @inject(TYPES.TransactionService) private transactionService: TransactionService
  ) {
    super()
  }

  @Get()
  async hi(): Promise<string> {
    return "222"
  }

  @Get('tx/{tx}')
  async debugTransaction(@Path() tx: string ) : Promise<TransactionReceipt> {
    return this.transactionService.findTransactionReceipt(tx)
  }
}
