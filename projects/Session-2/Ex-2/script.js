function maxProductSorted(arr) {
    arr.sort((a, b) => a - b);
    const n = arr.length;
    return Math.max(arr[0] * arr[1], arr[n-1] * arr[n-2]);
}
