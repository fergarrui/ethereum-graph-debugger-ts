import { Opcode } from "../../bytecode/Opcode";

export interface OperationResponse {
  offset: number
  opcode: Opcode
  argument: string
}
