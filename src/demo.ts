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

