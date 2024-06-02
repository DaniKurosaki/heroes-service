import { Injectable } from "@angular/core";
import { ThemeType } from "../../shared/interfaces/common.interface";
import { BehaviorSubject } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class ThemeManagerService {
	readonly defaultTheme: ThemeType = "dark";
	public readonly theme$ = new BehaviorSubject<ThemeType>(this.defaultTheme);

	constructor() {
		this.defaultTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
	}

	get theme(): ThemeType {
		return this.theme$.value;
	}

	set theme(theme: ThemeType) {
		this.theme$.next(theme);
		document.body.className = theme + "-theme";
	}

	toggleTheme(): void {
		this.theme = this.theme === "dark" ? "light" : "dark";
	}
}
