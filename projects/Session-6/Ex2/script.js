const nested = {
    a: { z: 1 },
    b: { c: 2, d: { e: 3 } },
    f: [4, 5],
    g: { h: 6, i: 7, j: { k: 8 } }
};

function flattenObject(obj, parentKey = "", result = {}) {
    for (const key in obj) {
        const newKey = parentKey ? `${parentKey}.${key}` : key;
        if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
            flattenObject(obj[key], newKey, result);
        } else if (Array.isArray(obj[key])) {
            obj[key].forEach((item, index) => {
                flattenObject({ [index]: item }, newKey, result);
            });
        } else {
            result[newKey] = obj[key];
        }
    }
    return result;
}

console.log(flattenObject(nested));
