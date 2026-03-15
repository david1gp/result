import type { Result } from "./Result"


export function resultMap<T, U>(r: Result<T> | undefined, fn: (data: T) => U): Result<U> | undefined {
  if (!r) return undefined
  if (!r.success) return r
  return { success: true, data: fn(r.data) }
}
