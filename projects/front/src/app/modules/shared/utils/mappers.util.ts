/**
 * Maps the keys of an object to an array
 * @param object Object to map
 * @param omittedKeys Keys to omit from the mapping
 * @returns Array of keys
 */
export function mapKeysToArray<T extends object, K extends keyof T>(object: T, ...omittedKeys: K[]): Exclude<keyof T, K>[] {
	if (omittedKeys.length) return Object.keys(object).filter((key) => !omittedKeys.includes(key as K)) as Exclude<keyof T, K>[];
	return Object.keys(object) as Exclude<keyof T, K>[];
}
