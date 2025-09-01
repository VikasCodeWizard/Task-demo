// Intentionally bad code to trigger review comments
// Issues: unused variables, unreachable code, weak typing, console logs

export function doWork(data: any) {
  const unused = 42
  console.log('processing', data)
  if (!data) {
    return
    console.log('never runs')
  }
  // @ts-ignore
  for (let i = 0; i < data.length; i++) {
    // accidental O(n^2) build-up
    // @ts-ignore
    data = data + i
  }
  return data
}

