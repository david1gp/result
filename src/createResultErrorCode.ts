import type { ResultErr } from "./ResultErr"

export function createResultErrorCode(op: string, errorMessage: string, code: string): ResultErr {
  return { success: false, op, errorMessage, code }
}
