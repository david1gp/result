import type { ResultErr } from "./ResultErr.js"
import type { ResultOk } from "./ResultOk.js"

export type Result<T> = ResultOk<T> | ResultErr
