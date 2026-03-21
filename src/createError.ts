import { type ResultErr } from "./ResultErr.js"
import { createResultError } from "./createResultError.js"

export function createError(op: string, errorMessage: string, errorData?: string | null): ResultErr {
  return createResultError(op, errorMessage, errorData)
}
