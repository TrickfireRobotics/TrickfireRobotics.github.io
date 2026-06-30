import { greet } from "./greet.js";

const name = process.argv[2] ?? "world";

console.log(greet(name));
