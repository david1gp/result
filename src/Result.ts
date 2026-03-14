import type { ResultErr } from "./ResultErr"
import type { ResultOk } from "./ResultOk"

export type Result<T> = ResultOk<T> | ResultErr
