import { Route, Controller, Get, Post } from "tsoa";
import { provideSingleton } from "../inversify/ioc";

@Route('debug')
@provideSingleton(DebuggerController)
export class DebuggerController extends Controller {
  
  @Get()
  async hi(): Promise<string> {
    return "222"
  }
}
