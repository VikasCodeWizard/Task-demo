function calculateSum(a, b) {
  // Missing input validation
  let result = a + b;
  console.log("Result: " + result);  // Should use template literals
  return result;
}

// Unused variable
let unusedVar = 10;

function divideNumbers(x, y) {
  // No zero division check
  return x / y;
}

// Missing error handling
async function fetchData(url) {
  const response = await fetch(url);
  return response.json();
}
