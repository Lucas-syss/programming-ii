/**
 * Sums the values in the given list of numbers.
 *
 * @function sumOfInput
 * @param {Array<number>} list - An array of numbers to sum.
 * @returns {number} The sum of the numbers in the list.
 */
export function sumOfInput(list) {
    let sumNumbers = 0;
    for (let i = 0; i < list.length; i++) {
        sumNumbers += list[i];
    }
    return sumNumbers;
}

/**
 * Calculates the average of the given list of numbers.
 *
 * @function averageOfInput
 * @param {Array<number>} list - An array of numbers to calculate the average.
 * @returns {number} The average of the numbers in the list.
 */
export function averageOfInput(list) {
    let avgNumbers = 0;
    avgNumbers = sumOfInput(list) / list.length;
    return avgNumbers;
}

/**
 * Calculates the median of the given list of numbers.
 * The list will be sorted before calculating the median.
 *
 * @function medianOfInput
 * @param {Array<number>} list - An array of numbers to calculate the median.
 * @returns {number} The median of the numbers in the list.
 */
export function medianOfInput(list) {
    list.sort((a, b) => a - b);

    const length = list.length;
    if (length % 2 === 1) {
        return list[Math.floor(length / 2)];
    } else {
        const mid1 = list[length / 2 - 1];
        const mid2 = list[length / 2];
        return (mid1 + mid2) / 2;
    }
}
