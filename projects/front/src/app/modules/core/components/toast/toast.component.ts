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
	["ERROR"]: "An error occurred while processing the request",
};

@Component({
	selector: "toast",
	standalone: true,
	imports: [MatButtonModule, MatIconModule, MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction],
	templateUrl: "./toast.component.html",
	styleUrl: "./toast.component.scss",
})
export class ToastComponent {
	readonly snackBarRef = inject(MatSnackBarRef);

	@HostBinding("class") get hostClass() {
		return `toast toast--${this.data.type}`;
	}

	constructor(@Inject(MAT_SNACK_BAR_DATA) public data: Toast) {
		if (data.type === "error" && !data.title) data.title = MessagesLocalized["ERROR"];
	}
}
