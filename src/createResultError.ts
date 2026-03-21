import type { ResultErr } from "./ResultErr.js"

export function createResultError(op: string, errorMessage: string, errorData?: string | null): ResultErr {
  const r: ResultErr = { success: false, op, errorMessage }
  if (errorData) r.errorData = errorData
  return r
}
