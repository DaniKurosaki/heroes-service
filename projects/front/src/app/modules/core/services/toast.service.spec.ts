import { TestBed } from "@angular/core/testing";
import { MatSnackBar, MatSnackBarModule, MatSnackBarConfig } from "@angular/material/snack-bar";
import { ComponentType } from "@angular/cdk/portal";
import { ToastService } from "./toast.service";

describe("ToastService", () => {
	let service: ToastService;
	let snackBar: MatSnackBar;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [MatSnackBarModule],
			providers: [ToastService],
		});
		service = TestBed.inject(ToastService);
		snackBar = TestBed.inject(MatSnackBar);
		spyOn(snackBar, "openFromComponent");
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	it("should open a snack bar with the specified component and configuration", () => {
		const componentMock: ComponentType<any> = {} as ComponentType<any>;
		const configMock: MatSnackBarConfig = {
			duration: 3000,
			data: { message: "Test message" },
		};

		service.openFromComponent(componentMock, configMock);

		expect(snackBar.openFromComponent).toHaveBeenCalledWith(componentMock, configMock);
	});

	it("should open a snack bar with the specified component and default configuration if none is provided", () => {
		const componentMock: ComponentType<any> = {} as ComponentType<any>;

		service.openFromComponent(componentMock);

		expect(snackBar.openFromComponent).toHaveBeenCalledWith(componentMock, undefined);
	});
});
