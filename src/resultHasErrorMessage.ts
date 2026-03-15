import type { Result } from "./Result"

export function resultHasErrorMessage<T>(r: Result<T> | undefined) {
  if (!r) return ""
  if (!r.success) return r.errorMessage
  return ""
}
