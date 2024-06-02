import { FormControl, FormGroup } from "@angular/forms";

export interface KeyValuePair<V = string, K extends string = string> {
	key: K;
	value: V;
}

export type ModelFormGroup<T> = FormGroup<{
	[K in keyof T]: FormControl<T[K]>;
}>;

export interface ILoad {
	load(): void;
	unload(): void;
}

export type ThemeType = 'light' | 'dark';

export type ToastType = "success" | "error";

export interface Toast {
	title?: string;
	message?: string;
	type: ToastType;
}
