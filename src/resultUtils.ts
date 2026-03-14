import type { Result } from "./Result"
import type { ResultErr } from "./ResultErr"

export function resultIsOk<T>(r: Result<T> | undefined): r is { success: true; data: T } {
  return r?.success === true
}

export function resultIsErr<T>(r: Result<T> | undefined): r is { success: false; op: string; errorMessage: string } {
  return r?.success === false
}

export function resultGetOrElse<T>(r: Result<T> | undefined, defaultValue: T): T {
  if (!r || !r.success) return defaultValue
  return r.data
}

export function resultMap<T, U>(r: Result<T> | undefined, fn: (data: T) => U): Result<U> | undefined {
  if (!r) return undefined
  if (!r.success) return r
  return { success: true, data: fn(r.data) }
}

export function resultMapErr<T>(r: Result<T>, fn: (err: ResultErr) => ResultErr): Result<T> {
  if (r.success) return r
  return fn(r)
}
