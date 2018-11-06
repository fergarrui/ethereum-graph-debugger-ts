import { Container, inject, interfaces, decorate, injectable } from 'inversify'
import { autoProvide, makeProvideDecorator, makeFluentProvideDecorator } from 'inversify-binding-decorators'
import { Controller } from 'tsoa'
import { IWeb3 } from '../blockchain/IWeb3';
import { TYPES } from './types';
import { Web3 } from '../blockchain/Web3';
import { IShhService } from '../service/IShhService';
import { ShhService } from '../service/ShhService';

const iocContainer = new Container()
const provide = makeProvideDecorator(iocContainer)
const fluentProvider = makeFluentProvideDecorator(iocContainer)

decorate(injectable(), Controller)

iocContainer.bind<string>('node-url').toConstantValue(process.env.NODE_URL || 'http://127.0.0.1:9000')
iocContainer.bind<IWeb3>(TYPES.Web3Instance).to(Web3)
iocContainer.bind<IShhService>(TYPES.ShhService).to(ShhService)

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
