export interface KeyValuePair<K extends string | number | symbol, T = string> {
	key: K;
	value: T;
}