export function mapValuesToArray<T extends object>(enumObject: T): T[keyof T][] {
	return Object.values(enumObject);
}
