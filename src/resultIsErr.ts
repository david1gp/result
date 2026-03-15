import type { Result } from "./Result";


export function resultIsErr<T>(r: Result<T> | undefined): r is { success: false; op: string; errorMessage: string}  {
  return r?.success === false
}
