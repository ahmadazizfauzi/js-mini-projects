
function isPrime(n) {
  if (n < 2) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

function getLabel(n) {
  if (n % 3 === 0 && n % 5 === 0) return "FooBar";
  if (n % 3 === 0) return "Foo";
  if (n % 5 === 0) return "Bar";
  return String(n);
}

// Create array 1 to 100
const numbers = Array.from({ length: 100 }, (_, i) => i + 1);

// Process in reverse order, skip primes
const result = [];
for (let i = numbers.length - 1; i >= 0; i--) {
  const n = numbers[i];
  if (!isPrime(n)) {
    result.push(getLabel(n));
  }
}

console.log(result.join(", "));

