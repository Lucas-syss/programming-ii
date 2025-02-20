import { Transform } from "./stream.js";

const file = "lunarData.csv";

const transform = new Transform(file);

transform.start();
