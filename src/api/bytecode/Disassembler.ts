import { Operation } from "./Operation";

export interface Disassembler {
  disassemble(bytecode: string): Operation[]
}
