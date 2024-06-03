import { Component, HostBinding, Inject, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MAT_SNACK_BAR_DATA, MatSnackBarAction, MatSnackBarActions, MatSnackBarLabel, MatSnackBarRef } from "@angular/material/snack-bar";
import { Toast } from "../../../shared/interfaces/common.interface";

/**
 * Localized text keys for this component messages
 */
type Messages = "ERROR";

/**
 * Localized texts for this component messages
 */
const MessagesLocalized: Record<Messages, string> = {
	["ERROR"]: $localize`:@@Toast.DefaultError:An error occurred while processing the request`,
};

/**
 * This core component is the toast used to display messages to the user
 */
@Component({
	selector: "toast",
	standalone: true,
	imports: [MatButtonModule, MatIconModule, MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction],
	templateUrl: "./toast.component.html",
	styleUrl: "./toast.component.scss",
})
export class ToastComponent {
	/**
	 * Injected dependency for MatSnackBarRef
	 */
	protected readonly snackBarRef = inject(MatSnackBarRef);

	/**
	 * Host binding class for the toast
	 */
	@HostBinding("class") get hostClass(): string {
		return `toast toast--${this.data.type}`;
	}

	/**
	 * Constructor
	 * @param data Toast's data
	 */
	constructor(@Inject(MAT_SNACK_BAR_DATA) public data: Toast) {
		if (data.type === "error" && !data.title) data.title = MessagesLocalized["ERROR"];
	}
}
