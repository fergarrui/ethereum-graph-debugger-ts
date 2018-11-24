export interface TransactionTrace {
  id?: number
  jsonrpc?: number
  result: {
    gas: number
    returnValue?: any
    structLogs: {
      depth: 0
      error: any
      gas: number
      gasCost: number
      memory: string[]
      op: string
      pc: number
      stack: string[]
      storage: any
    }[]
  }[]
}
