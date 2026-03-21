import type { Result } from "./Result.js"

export function resultHasData<T>(r: Result<T> | undefined): T | null {
  if (!r) return null
  if (!r.success) return null
  return r.data
}
