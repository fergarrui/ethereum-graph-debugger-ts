import { TransactionService } from './TransactionService'
import { injectable, inject } from 'inversify'
import { TYPES } from '../../../inversify/types'
import { IWeb3 } from '../../blockchain/IWeb3'
import { TransactionReceipt } from '../bean/TransactionReceipt'
import { TransactionTrace } from '../response/TransactionTrace'

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

  async findTransactionTrace(transactionHash: string): Promise<TransactionTrace> {
    return new Promise<TransactionTrace>((resolve, reject) => {
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
  }
}
