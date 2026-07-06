import { createResultError } from "./createResultError.js"
import type { ResultErr } from "./ResultErr.js"

export function createError(op: string, errorMessage: string, errorData?: string | null): ResultErr {
  return createResultError(op, errorMessage, errorData)
}
