import { Injectable, inject } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
import { ComponentType } from "@angular/cdk/portal";

/**
 * This service serves as a wrapper for Material Snack Bar
 */
@Injectable({
	providedIn: "root",
})
export class ToastService {
	/**
	 * Injected dependency for Material Snack Bar
	 */
	private readonly snackBar: MatSnackBar = inject(MatSnackBar);

	/**
	 * Open a simple message toast in a certain component with a certain configuration
	 * @param component Component to be displayed
	 * @param config Configuration for the toast
	 */
	openFromComponent<T, D = any>(component: ComponentType<T>, config?: MatSnackBarConfig<D>) {
		this.snackBar.openFromComponent(component, config);
	}
}
