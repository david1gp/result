import * as a from "valibot"
import type { PromiseResult } from "./PromiseResult.js"
import { createResult } from "./createResult.js"
import { createResultError } from "./createResultError.js"
import { resultTryParsingFetchErr } from "./resultTryParsingFetchErr.js"

type FetchInput = Parameters<typeof fetch>[0]
type FetchInit = Parameters<typeof fetch>[1]

export async function fetchResult(op: string, input: FetchInput, init?: FetchInit): PromiseResult<string>

export async function fetchResult<const TSchema extends a.GenericSchema>(
  op: string,
  input: FetchInput,
  init: FetchInit | undefined,
  schema: TSchema,
): PromiseResult<a.InferOutput<TSchema>>

export async function fetchResult<const TSchema extends a.GenericSchema>(
  op: string,
  input: FetchInput,
  init?: FetchInit,
  schema?: TSchema,
): PromiseResult<string | a.InferOutput<TSchema>> {
  let response: Response
  try {
    response = await fetch(input, init)
  } catch (error) {
    return createResultError(op, "Fetch failed", error instanceof Error ? error.message : String(error))
  }

  const text = await response.text()
  if (!response.ok) {
    console.error(op, response.status, response.statusText, text)
    return resultTryParsingFetchErr(op, text, response.status, response.statusText)
  }

  if (!schema) return createResult(text)

  const textSchema = a.pipe(a.string(), a.parseJson(), schema)
  const parseResult = a.safeParse(textSchema, text)
  if (!parseResult.success) {
    const errorMessage = a.summarize(parseResult.issues)
    console.error(op, errorMessage, parseResult.issues)
    return createResultError(op, errorMessage, text)
  }

  return createResult(parseResult.output)
}
