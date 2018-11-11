import { TransactionService } from "./TransactionService";
import { injectable, inject } from "inversify";
import { TYPES } from "../../../inversify/types";
import { IWeb3 } from "../../blockchain/IWeb3";
import { TransactionReceipt } from "../bean/TransactionReceipt";
import { Opcodes } from "../../bytecode/Opcodes";

@injectable()
export class TransactionServiceImpl implements TransactionService {

  web3

  constructor(
    @inject(TYPES.Web3Instance) private web3Instance: IWeb3,
    @inject(TYPES.Opcodes) private opcs: Opcodes

  ) {
    this.web3 = this.web3Instance.getInstance()
  }

  async findTransactionReceipt(transactionHash: string): Promise<TransactionReceipt> {
    const receipt: TransactionReceipt = await this.web3.eth.getTransactionReceipt(transactionHash)
    const op = this.opcs.getOpcode(0)
    console.log(op)
    return receipt
  }
}
