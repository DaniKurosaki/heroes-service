import { KeyValuePair } from "../interfaces/common.interface";

export function mapKeysToArray<T extends object>(enumObject: T, ...omittedKeys: (keyof T)[]): (keyof Omit<T, (typeof omittedKeys)[number]>)[] {
	if (omittedKeys.length)
		return Object.keys(enumObject).filter((key) => !omittedKeys.includes(key as keyof T)) as (keyof Omit<T, (typeof omittedKeys)[number]>)[];
	return Object.keys(enumObject) as (keyof Omit<T, (typeof omittedKeys)[number]>)[];
}

export function mapValuesToArray<T extends object>(enumObject: T): T[keyof T][] {
	return Object.values(enumObject);
}

export function mapRecordToKeyValuePair<T extends Record<K, V>, V, K extends string>(record: T): KeyValuePair<V, K>[] {
	return Object.entries(record).map<KeyValuePair<V, K>>(([key, value]) => ({ key: key as K, value: value as V }));
}
