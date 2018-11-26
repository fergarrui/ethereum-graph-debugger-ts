import { Route, Controller } from 'tsoa'
import { provideSingleton } from '../../../inversify/ioc'

@Route('debug')
@provideSingleton(DebuggerController)
export class DebuggerController extends Controller {
  constructor() {
    super()
  }
}
