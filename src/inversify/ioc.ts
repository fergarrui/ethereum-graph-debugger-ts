import { Container, inject, interfaces, decorate, injectable } from 'inversify'
import { autoProvide, makeProvideDecorator, makeFluentProvideDecorator } from 'inversify-binding-decorators'
import { Controller } from 'tsoa'
import { IWeb3 } from '../blockchain/IWeb3';
import { TYPES } from './types';
import { Web3Instance } from '../blockchain/Web3Instance';
import { FileServiceDefault } from '../service/service/FileServiceDefault';
import { FileService } from '../service/service/FileService';
import { TransactionServiceImpl } from '../service/service/TransactionServiceImpl';
import { TransactionService } from '../service/service/TransactionService';
import { Opcodes } from '../bytecode/Opcodes';

const iocContainer = new Container()
const provide = makeProvideDecorator(iocContainer)
const fluentProvider = makeFluentProvideDecorator(iocContainer)

decorate(injectable(), Controller)

iocContainer.bind<IWeb3>(TYPES.Web3Instance).to(Web3Instance)
iocContainer.bind<FileService>(TYPES.FileService).to(FileServiceDefault)
iocContainer.bind<TransactionService>(TYPES.TransactionService).to(TransactionServiceImpl)
iocContainer.bind<Opcodes>(TYPES.Opcodes).to(Opcodes)

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
