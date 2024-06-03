import { Injectable } from "@angular/core";
import { ThemeType } from "../../shared/interfaces/common.interface";
import { BehaviorSubject } from "rxjs";

/**
 * This service manages the theme of the application
 */
@Injectable({
	providedIn: "root",
})
export class ThemeManagerService {
	/**
	 * Default theme
	 */
	private readonly defaultTheme: ThemeType = "dark";

	/**
	 * Theme subject
	 */
	public readonly theme$ = new BehaviorSubject<ThemeType>(this.defaultTheme);

	/**
	 * Theme getter
	 */
	get theme(): ThemeType {
		return this.theme$.value;
	}

	/**
	 * Theme setter
	 */
	set theme(theme: ThemeType) {
		this.theme$.next(theme);
		document.body.className = theme + "-theme";
	}

	/**
	 * Toggle the theme from dark to light and vice versa
	 */
	toggleTheme(): void {
		this.theme = this.theme === "dark" ? "light" : "dark";
	}
}
