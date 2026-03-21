import type { Result } from "./Result.js"
import type { ResultErr } from "./ResultErr.js"


export function resultMapErr<T>(r: Result<T>, fn: (err: ResultErr) => ResultErr): Result<T> {
  if (r.success) return r
  return fn(r)
}
