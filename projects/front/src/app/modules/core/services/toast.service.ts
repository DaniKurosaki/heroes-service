import { Injectable, inject } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
import { ComponentType } from "@angular/cdk/portal";

@Injectable({
	providedIn: "root",
})
export class ToastService {
	/**
	 * Injected dependency for Material Snack Bar
	 */
	private readonly snackBar: MatSnackBar = inject(MatSnackBar);

	openFromComponent<T, D = any>(component: ComponentType<T>, config?: MatSnackBarConfig<D>) {
		this.snackBar.openFromComponent(component, config);
	}
}
