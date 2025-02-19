
function fibonnaci(n) {
    const memo = new Map();
    function fib(n) {
        if (n <= 1) return n;
        if (memo.has(n)) return memo.get(n);
        const result = fib(n - 1) + fib(n - 2);
        memo.set(n, result);
        return result;
    }
    return fib(n);
}
console.time("1st Call")
console.log(fibonnaci(10))
console.timeEnd("1st Call")
console.time("2nd Call")
console.log(fibonnaci(50))
console.timeEnd("2nd Call")
// console.time("3")
// console.log(fibonnaci(30))
// console.timeEnd("3")

