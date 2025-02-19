/**
 * Main script for processing a list of numbers based on user input.
 * The user provides a comma-separated list of numbers and an operation (Sum, Average, or Median).
 * 
 * @module index
 */

import { averageOfInput, medianOfInput, sumOfInput } from "./functions.js";

/**
 * The arguments from the command line input.
 * 
 * @type {Array<string>}
 */
let args = process.argv.slice(2);

/**
 * An array of numbers parsed from the comma-separated input.
 * 
 * @type {Array<number>}
 */
let numbers = args[0].split(",").map(Number);

/**
 * The operation to perform on the numbers (Sum, Average, or Median).
 * 
 * @type {string}
 */
let operation = args[1];

/**
 * Switches between operations based on user input and logs the result to the console.
 * 
 * @throws {Error} Will throw an error if the operation is invalid.
 */
switch (operation) {
    case "Sum":
        console.log("Sum:", sumOfInput(numbers));
        break;
    case "Average":
        console.log("Average:", averageOfInput(numbers));
        break;
    case "Median":
        console.log("Median:", medianOfInput(numbers));
        break;
    default:
        console.log(
            "Invalid operation. Please choose 'Sum', 'Average', or 'Median'.",
        );
}
