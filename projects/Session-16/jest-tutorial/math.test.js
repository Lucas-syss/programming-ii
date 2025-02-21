import { sub, sum } from "./math.js";

test("if is a valid number", () => {
    const n1 = 2;
    const n2 = 2;
    expect();
});

test("false-2= Error()", () => {
    const a = undefined;
    const b = 2;
    expect(()=>sub(a,b)).toThrow(Error);
    expect(()=>sub(a,b)).toThrow(("not possible"));
});

test("false-2= Error()", () => {
    const a = 2;
    const b = true;
    expect(()=>sub(a,b)).toThrow(Error);
    expect(()=>sub(a,b)).toThrow(("not possible"));
});

test("adds 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3);
});

test("adds 2 - 2 to equal 0", () => {
    expect(sub(2, 2)).toBe(0);
});
