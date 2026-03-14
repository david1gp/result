# @adaptive-ds/result

Stop letting errors crash your parties.
Handle them gracefully with a simple, type-safe Result type that tells you exactly what went wrong and where.

## Features

- **Type-safe** - Full TypeScript inference, no more `any`
- **Explicit errors** - Know exactly which operation failed and why
- **No try-catch soup** - Clean, readable error handling
- **Chainable** - Transform results with `resultMap`, `resultMapErr`
- **Lightweight** - Zero dependencies, tree-shakable

## The Problem

```typescript
// Traditional error handling? No thanks.
async function fetchUser(id: string) {
  try {
    const user = await api.getUser(id)
    return user
  } catch (e) {
    // Wait, was it a network error? Validation? Database?
    console.log(e) // "Something went wrong" 😩
    throw e // Re-throwing loses context
  }
}
```

## The Solution

```typescript
import { createResult, createResultError, type PromiseResult } from "@adaptive-ds/result"

async function fetchUser(id: string): PromiseResult<User> {
  const validation = validateId(id)
  if (!validation.success) return createResultError("fetchUser", "Invalid ID", validation.error)

  try {
    const user = await api.getUser(id)
    return createResult(user)
  } catch (e) {
    return createResultError("fetchUser", "API failed", e.message)
  }
}

// Usage is explicit and safe
const result = await fetchUser("123")
if (!result.success) {
  console.log(result.op, result.errorMessage) // Exactly what went wrong
  return
}
console.log(result.data) // TypeScript knows this is User
```

## Installation

```bash
bun add @adaptive-ds/result
# or
npm install @adaptive-ds/result
```

## Quick Start

```typescript
import { createResult, createResultError, resultIsOk, resultMap } from "@adaptive-ds/result"

// Create success
const ok = createResult({ name: "Alice" })
// { success: true, data: { name: "Alice" } }

// Create error
const err = createResultError("saveUser", "Email already taken")
// { success: false, op: "saveUser", errorMessage: "Email already taken" }

// Type guard
if (resultIsOk(ok)) {
  console.log(ok.data) // TypeScript knows it's valid
}

// Transform data
const mapped = resultMap(ok, (user) => user.name.toUpperCase())
```

## API

### Types

- `ResultOk<T>` - Success state with data
- `ResultErr` - Failure state with operation, message, optional code/data
- `Result<T>` - Union of Ok and Err
- `PromiseResult<T>` - Async Result

### Functions

- `createResult(data)` - Create a success result
- `createError(op, message, data?)` - Create an error result
- `createResultError(op, message, data?)` - Alias for createError
- `createResultErrorCode(op, message, code)` - Create error with error code
- `resultIsOk(r)` - Type guard for success
- `resultIsErr(r)` - Type guard for failure
- `resultGetOrElse(r, default)` - Get data or return default
- `resultMap(r, fn)` - Transform data if success
- `resultMapErr(r, fn)` - Transform error if failure

## License

MIT
