import { injectable, inject } from "inversify"
import Web3 from 'web3'
import { IWeb3 } from "./IWeb3";

@injectable()
export class Web3 implements IWeb3 {

  web3Instance: any

  constructor(
    @inject('node-url') nodeUrl: string
  ) {
    this.web3Instance = new Web3(nodeUrl)
  }
}
