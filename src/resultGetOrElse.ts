import type { Result } from "./Result.js"


export function resultGetOrElse<T>(r: Result<T> | undefined, defaultValue: T): T {
  if (!r || !r.success) return defaultValue
  return r.data
}
