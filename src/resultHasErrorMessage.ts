import type { Result } from "./Result.js"

export function resultHasErrorMessage<T>(r: Result<T> | undefined) {
  if (!r) return ""
  if (!r.success) return r.errorMessage
  return ""
}
