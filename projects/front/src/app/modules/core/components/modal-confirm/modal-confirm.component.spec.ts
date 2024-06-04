import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ModalConfirmComponent, DialogData } from "./modal-confirm.component";
import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";

describe("ModalConfirmComponent", () => {
	let component: ModalConfirmComponent;
	let fixture: ComponentFixture<ModalConfirmComponent>;
	let dialogRef: MatDialogRef<ModalConfirmComponent>;

	const mockDialogData: DialogData = {
		title: "Test Title",
		cancelText: "Cancel",
		confirmText: "Confirm",
	};

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [MatDialogModule, NoopAnimationsModule, ModalConfirmComponent],
			providers: [
				{ provide: MAT_DIALOG_DATA, useValue: mockDialogData },
				{ provide: MatDialogRef, useValue: { close: jasmine.createSpy("close") } },
			],
		}).compileComponents();

		dialogRef = TestBed.inject(MatDialogRef);
		fixture = TestBed.createComponent(ModalConfirmComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should display the correct title", () => {
		const titleElement = fixture.debugElement.query(By.css("h2")).nativeElement;
		expect(titleElement.textContent).toBe(mockDialogData.title);
	});

	it("should display the correct cancel button text", () => {
		const cancelButton = fixture.debugElement.query(By.css("button")).nativeElement;
		expect(cancelButton.textContent).toBe(mockDialogData.cancelText);
	});

	it("should display the correct confirm button text", () => {
		const confirmButton = fixture.debugElement.queryAll(By.css("button"))[1].nativeElement;
		expect(confirmButton.textContent).toBe(mockDialogData.confirmText);
	});

	it("should close the dialog with false when cancel is clicked", () => {
		const cancelButton = fixture.debugElement.query(By.css("button")).nativeElement;
		cancelButton.click();
		expect(dialogRef.close).toHaveBeenCalledWith(false);
	});

	it("should close the dialog with true when confirm is clicked", () => {
		const confirmButton = fixture.debugElement.queryAll(By.css("button"))[1].nativeElement;
		confirmButton.click();
		expect(dialogRef.close).toHaveBeenCalledWith(true);
	});

	it("should use default values if no data is provided", async () => {
		await TestBed.resetTestingModule();

		await TestBed.configureTestingModule({
			imports: [ModalConfirmComponent, MatDialogModule, NoopAnimationsModule, MatButtonModule],
			providers: [
				{ provide: MAT_DIALOG_DATA, useValue: {} },
				{ provide: MatDialogRef, useValue: { close: jasmine.createSpy("close") } },
			],
		}).compileComponents();

		fixture = TestBed.createComponent(ModalConfirmComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();

		expect(component.data.title).toBe("Are you sure?");
		expect(component.data.cancelText).toBe("Cancel");
		expect(component.data.confirmText).toBe("Confirm");
	});
});
