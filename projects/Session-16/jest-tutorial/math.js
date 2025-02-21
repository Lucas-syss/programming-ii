export function sum(a, b) {
    return a + b;
}

export function sub(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error("not possible");
    }
    return a - b;
}
