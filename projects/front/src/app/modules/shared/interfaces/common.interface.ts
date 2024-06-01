import { FormControl, FormGroup } from "@angular/forms";

export interface KeyValuePair<K extends string | number | symbol, T = string> {
	key: K;
	value: T;
}

export type ModelFormGroup<T> = FormGroup<{
	[K in keyof T]: FormControl<T[K]>;
}>;

export interface ILoad {
	load(): void;
	unload(): void;
}
