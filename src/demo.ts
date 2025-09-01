// Demo file to trigger AutoReviewer. Intentionally loose typing and style.
// The action excludes *.js by default in your workflow config, so use .ts here.

export function sum(a: any, b: any) {
  // TODO: add input validation
  return a + b
}

export function factorial(n: number) {
  // naive recursive implementation (could be optimized)
  if (n <= 1) return 1
  return n * factorial(n - 1)
}

// Below are intentionally poor implementations to trigger reviewer feedback
export function isEven(n: number) {
  // BUG: this is the wrong condition for even numbers
  return n % 2 === 1
}

export function parseJson(input: any): any {
  // Smells: any typing, swallowed error, no fallback type
  try {
    // @ts-ignore
    return JSON.parse(input)
  } catch (e) {
    // ignore
  }
}

export function riskyConcat(a: any, b: any) {
  // Smells: implicit any and confusing coercion
  // @ts-ignore
  return a + b + 0
}

const cache: any = {}
export function addToCache(key: any, value: any) {
  // Smells: global mutable cache with any types
  cache[key] = value
}
export function getFromCache(key: any) {
  // BUG: throws at runtime if key missing
  // @ts-ignore
  return cache[key] ?? JSON.parse("not json")
}

