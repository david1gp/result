
export type ResultErr = {
  success: false
  op: string
  code?: string
  errorMessage: string
  errorData?: string | null
  statusCode?: number
}
