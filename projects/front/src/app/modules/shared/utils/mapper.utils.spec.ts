import { mapKeysToArray } from "./mappers.util";

describe("mapKeysToArray", () => {
	it("should map all keys of an object to an array", () => {
		const obj = { a: 1, b: 2, c: 3 };
		const result: string[] = mapKeysToArray(obj);
		expect(result).toEqual(["a", "b", "c"]);
	});

	it("should omit specified keys from the mapping", () => {
		const obj = { a: 1, b: 2, c: 3 };
		const result = mapKeysToArray(obj, "b");
		expect(result).toEqual(["a", "c"]);
	});

	it("should handle an empty object", () => {
		const obj = {};
		const result = mapKeysToArray(obj);
		expect(result).toEqual([]);
	});

	it("should handle omitting keys not present in the object", () => {
		const obj = { a: 1, b: 2, c: 3 };
		const result = mapKeysToArray(obj, "c");
		expect(result).toEqual(["a", "b"]);
	});

	it("should handle omitting multiple keys", () => {
		const obj = { a: 1, b: 2, c: 3, d: 4 };
		const result = mapKeysToArray(obj, "a", "d");
		expect(result).toEqual(["b", "c"]);
	});

	it("should handle omitting all keys", () => {
		const obj = { a: 1, b: 2, c: 3 };
		const result = mapKeysToArray(obj, "a", "b", "c");
		expect(result).toEqual([]);
	});

	it("should handle object with non-string keys", () => {
		const obj = { 1: "one", 2: "two", 3: "three" };
		const result: string[] = mapKeysToArray(obj);
		expect(result).toEqual(["1", "2", "3"]);
	});

	it("should handle object with mixed keys", () => {
		const obj = { a: 1, 1: "one", b: 2 };
		const result = mapKeysToArray(obj, "a") as ("1" | "b")[];
		expect(result).toEqual(["1", "b"]);
	});
});
