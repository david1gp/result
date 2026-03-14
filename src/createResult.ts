import type { ResultOk } from "./ResultOk"

export function createResult<T>(data: T): ResultOk<T> {
  return {
    success: true,
    data,
  }
}
