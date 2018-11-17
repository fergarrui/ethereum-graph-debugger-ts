import { Container, inject, interfaces, decorate, injectable } from 'inversify'
import { autoProvide, makeProvideDecorator, makeFluentProvideDecorator } from 'inversify-binding-decorators'
import { Controller } from 'tsoa'
import { IWeb3 } from '../api/blockchain/IWeb3'
import { TYPES } from './types'
import { Web3Instance } from '../api/blockchain/Web3Instance'
import { FileServiceDefault } from '../api/service/service/FileServiceDefault'
import { FileService } from '../api/service/service/FileService'
import { TransactionServiceImpl } from '../api/service/service/TransactionServiceImpl'
import { TransactionService } from '../api/service/service/TransactionService'
import { Disassembler } from '../api/bytecode/Disassembler'
import { EVMDisassembler } from '../api/bytecode/EVMDisassembler'
import { CFGCreator } from '../api/cfg/CFGCreator'
import { EthereumCFGCreator } from '../api/cfg/EthereumCFGCreator'

const iocContainer = new Container()
const provide = makeProvideDecorator(iocContainer)
const fluentProvider = makeFluentProvideDecorator(iocContainer)

decorate(injectable(), Controller)

iocContainer.bind<IWeb3>(TYPES.Web3Instance).to(Web3Instance)
iocContainer.bind<FileService>(TYPES.FileService).to(FileServiceDefault)
iocContainer.bind<TransactionService>(TYPES.TransactionService).to(TransactionServiceImpl)
iocContainer.bind<Disassembler>(TYPES.Disassembler).to(EVMDisassembler)
iocContainer.bind<CFGCreator>(TYPES.CFGCreator).to(EthereumCFGCreator)

const provideNamed = (
  identifier: string | symbol | interfaces.Newable<any> | interfaces.Abstract<any>,
  name: string
) => {
  return fluentProvider(identifier)
    .whenTargetNamed(name)
    .done()
}

const provideSingleton = (identifier: string | symbol | interfaces.Newable<any> | interfaces.Abstract<any>) => {
  return fluentProvider(identifier)
    .inSingletonScope()
    .done()
}

export { iocContainer, autoProvide, provide, inject, provideSingleton, provideNamed }
