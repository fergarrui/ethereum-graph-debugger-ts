import { injectable } from 'inversify'
import { IWeb3 } from './IWeb3'
const Web3 = require('web3')

@injectable()
export class Web3Instance implements IWeb3 {
  web3Instance: any

  constructor() {
    // TODO make it configurable, support infura, kaleido, etc
    this.web3Instance = new Web3('http://127.0.0.1:9545')
  }

  getInstance(): any {
    return this.web3Instance
  }
}
