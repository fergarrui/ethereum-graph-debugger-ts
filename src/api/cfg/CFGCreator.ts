import { Operation } from "../bytecode/Operation";
import { OperationBlock } from "./OperationBlock";

export interface CFGCreator {
  createCFG(ops: Operation[]): OperationBlock[]
}
