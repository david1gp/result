import type { ResultOk } from "./ResultOk.js"

export function createResult<T>(data: T): ResultOk<T> {
  return {
    success: true,
    data,
  }
}
