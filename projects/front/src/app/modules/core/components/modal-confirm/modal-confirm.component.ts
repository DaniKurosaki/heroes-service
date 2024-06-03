import { Component, Inject, inject } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";

/**
 * Data for the dialog
 */
export interface DialogData {
	title: string;
	cancelText: string;
	confirmText: string;
}

/**
 * This component is a modal for confirmation
 */
@Component({
	selector: "modal-confirm",
	standalone: true,
	imports: [MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose],
	templateUrl: "./modal-confirm.component.html",
	styleUrl: "./modal-confirm.component.scss",
})
export class ModalConfirmComponent {
	/**
	 * Injected dependency for MatDialogRef
	 */
	protected readonly dialogRef: MatDialogRef<ModalConfirmComponent> = inject(MatDialogRef);

	/**
	 * Constructor
	 * @param data Dialog's data
	 */
	constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
		if (!data.title) data.title = "Are you sure?";
		if (!data.cancelText) data.cancelText = "Cancel";
		if (!data.confirmText) data.confirmText = "Confirm";
	}
}
