import type { ResultErr } from "./ResultErr.js"

export function createResultErrorCode(op: string, errorMessage: string, code: string): ResultErr {
  return { success: false, op, errorMessage, code }
}
