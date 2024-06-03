/**
 * Maps the keys of an object to an array
 * @param object Object to map
 * @param omittedKeys Keys to omit from the mapping
 * @returns Array of keys
 */
export function mapKeysToArray<T extends object>(object: T, ...omittedKeys: (keyof T)[]): (keyof Omit<T, (typeof omittedKeys)[number]>)[] {
	if (omittedKeys.length)
		return Object.keys(object).filter((key) => !omittedKeys.includes(key as keyof T)) as (keyof Omit<T, (typeof omittedKeys)[number]>)[];
	return Object.keys(object) as (keyof Omit<T, (typeof omittedKeys)[number]>)[];
}
