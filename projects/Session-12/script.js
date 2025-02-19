function customIterable(start, end) {
    return {
        *[Symbol.iterator]() {
            for (let i = start; i <= end; i++) {
                if (i % 2 == 0) {
                    yield i;
                }
            }
        },
    };
}

const generator = customIterable(1, 10);
console.log(...generator);