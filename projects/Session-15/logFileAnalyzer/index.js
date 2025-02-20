import { Transform } from "./logfile.js";

const file = "access.log";

async function main() {
    try {
        const result = await new Transform(file).start();
        console.log("Processing complete:");
        console.log(result);
    } catch (err) {
        console.error("Error processing file:", err);
    }
}

main();