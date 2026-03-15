import type { Result } from "./Result"
import type { ResultErr } from "./ResultErr"


export function resultMapErr<T>(r: Result<T>, fn: (err: ResultErr) => ResultErr): Result<T> {
  if (r.success) return r
  return fn(r)
}
