import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";

export class Transform {
    #filePath;
    constructor(filePath) {
        this.#filePath = filePath;
    }

    async start() {
        const stream = createReadStream(this.#filePath, "utf-8");
        const rl = createInterface({ input: stream, terminal: false });

        const statusCounts = { "200": 0, "404": 0, "500": 0 };

        for await (const line of rl) {
            const statusCode = line.trim().split(/\s+/).pop();
            if (statusCounts.hasOwnProperty(statusCode)) {
                statusCounts[statusCode]++;
            }
        }

        return {
            file: this.#filePath,
            totalLines: Object.values(statusCounts).reduce((a, b) => a + b, 0),
            statusCodes: statusCounts
        };
    }
}