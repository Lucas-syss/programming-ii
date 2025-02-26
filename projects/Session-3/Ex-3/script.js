function permute(str) {
    const result = [];

    function backtrack(current, remaining) {
        if (remaining.length === 0) {
            result.push(current);
            return;
        }

        for (let i = 0; i < remaining.length; i++) {
            let next = current + remaining[i]; 
            let rest = remaining.slice(0, i) + remaining.slice(i + 1); 
            backtrack(next, rest); 
        }
    }

    backtrack("", str); 
    return result;
}
