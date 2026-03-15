import type { Result } from "./Result";


export function resultIsOk<T>(r: Result<T> | undefined): r is { success: true; data: T}  {
  return r?.success === true
}
