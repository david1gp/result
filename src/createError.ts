import { type ResultErr } from "./ResultErr"
import { createResultError } from "./createResultError"

export function createError(op: string, errorMessage: string, errorData?: string | null): ResultErr {
  return createResultError(op, errorMessage, errorData)
}
