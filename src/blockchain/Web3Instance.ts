import { injectable } from "inversify"
import { IWeb3 } from "./IWeb3";
const Web3 = require('web3')

@injectable()
export class Web3Instance implements IWeb3 {

  web3Instance: any

  constructor(
  ) {
    // TODO configure
    const web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545')
    this.web3Instance = new Web3(web3Provider)
  }

  getInstance(): any {
    return this.web3Instance
  }
}
