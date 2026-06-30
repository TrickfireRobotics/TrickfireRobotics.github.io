import { describe, expect, it } from "vitest";
import { greet } from "./greet.js";

describe("greet", () => {
    it("greets the given name", () => {
        expect(greet("Trickfire")).toBe("Hello, Trickfire!");
    });
});
