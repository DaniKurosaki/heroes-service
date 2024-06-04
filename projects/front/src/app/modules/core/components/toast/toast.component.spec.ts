import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatSnackBarModule, MAT_SNACK_BAR_DATA, MatSnackBarRef } from "@angular/material/snack-bar";
import { ToastComponent } from "./toast.component";
import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

describe("ToastComponent", () => {
	let component: ToastComponent;
	let fixture: ComponentFixture<ToastComponent>;
	let snackBarRef: MatSnackBarRef<ToastComponent>;

	const mockSnackBarData = {
		type: "success",
		title: "Test Title",
		message: "Test Message",
	};

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ToastComponent, MatSnackBarModule, NoopAnimationsModule, MatButtonModule, MatIconModule],
			providers: [
				{ provide: MAT_SNACK_BAR_DATA, useValue: mockSnackBarData },
				{ provide: MatSnackBarRef, useValue: { dismissWithAction: jasmine.createSpy("dismissWithAction") } },
			],
		}).compileComponents();

		snackBarRef = TestBed.inject(MatSnackBarRef);
		fixture = TestBed.createComponent(ToastComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should display the correct title", () => {
		const titleElement = fixture.debugElement.query(By.css(".title")).nativeElement;
		expect(titleElement.textContent).toBe(mockSnackBarData.title);
	});

	it("should display the correct message", () => {
		const messageElement = fixture.debugElement.query(By.css(".message")).nativeElement;
		expect(messageElement.textContent).toBe(mockSnackBarData.message);
	});

	it("should display the default error title when type is error and title is not provided", async () => {
		const errorSnackBarData = { type: "error", message: "Error message" };

		await TestBed.resetTestingModule();

		await TestBed.configureTestingModule({
			imports: [ToastComponent, MatSnackBarModule, NoopAnimationsModule, MatButtonModule, MatIconModule],
			providers: [
				{ provide: MAT_SNACK_BAR_DATA, useValue: errorSnackBarData },
				{ provide: MatSnackBarRef, useValue: { dismissWithAction: jasmine.createSpy("dismissWithAction") } },
			],
		}).compileComponents();

		fixture = TestBed.createComponent(ToastComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();

		const titleElement = fixture.debugElement.query(By.css(".title")).nativeElement;
		expect(titleElement.textContent).toBe("An error occurred while processing the request");
	});

	it("should apply the correct class based on the type", () => {
		const hostElement = fixture.nativeElement;
		expect(hostElement.classList).toContain("toast--success");
	});

	it("should dismiss the snack bar when the close button is clicked", () => {
		const closeButton = fixture.debugElement.query(By.css("button")).nativeElement;
		closeButton.click();
		expect(snackBarRef.dismissWithAction).toHaveBeenCalled();
	});
});
