import { Route, Controller, Get, Post } from "tsoa";
import { provideSingleton } from "../inversify/ioc";

@Route('chat')
@provideSingleton(DebuggerController)
export class DebuggerController extends Controller {
  
  
}
