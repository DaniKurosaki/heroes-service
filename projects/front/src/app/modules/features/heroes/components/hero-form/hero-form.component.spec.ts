import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroFormComponent } from "./hero-form.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HeroService } from "../../services/hero.service";
import { ToastService } from "../../../../core/services/toast.service";
import { Router, ActivatedRoute } from "@angular/router";
import { of, throwError } from "rxjs";
import { By } from "@angular/platform-browser";
import { IHeroCreate } from "../../../../../../../../back/src/interfaces/hero.interface";

describe("HeroFormComponent", () => {
	let component: HeroFormComponent;
	let fixture: ComponentFixture<HeroFormComponent>;
	let heroService: HeroService;
	let toastService: ToastService;
	let router: Router;

	let mockHero: IHeroCreate;
	let defaultFormValue: IHeroCreate;

	beforeEach(async () => {
		defaultFormValue = {
			first_name: "",
			last_name: "",
			hero_name: "",
			birth_date: "",
			secret_identity: "public",
			gender: "male",
			superpower: "flight",
			team_affiliation: "avengers",
		};

		mockHero = {
			first_name: "John",
			last_name: "Doe",
			hero_name: "Test Hero",
			birth_date: "2000-01-01",
			secret_identity: "public",
			gender: "male",
			superpower: "flight",
			team_affiliation: "avengers",
		};

		const heroServiceMock = {
			getById: jasmine.createSpy("getById").and.returnValue(of({})),
			create: jasmine.createSpy("create").and.returnValue(of({ hero_name: "Test Hero" })),
			update: jasmine.createSpy("update").and.returnValue(of({ hero_name: "Test Hero" })),
		};

		const toastServiceMock = {
			openFromComponent: jasmine.createSpy("openFromComponent"),
		};

		await TestBed.configureTestingModule({
			imports: [
				ReactiveFormsModule,
				HeroFormComponent,
				MatFormFieldModule,
				MatIconModule,
				MatInputModule,
				MatButtonModule,
				MatSelectModule,
				BrowserAnimationsModule,
			],
			providers: [
				{ provide: HeroService, useValue: heroServiceMock },
				{ provide: ToastService, useValue: toastServiceMock },
				{
					provide: ActivatedRoute,
					useValue: {
						snapshot: {
							paramMap: {
								get: () => "1",
							},
							params: {},
						},
					},
				},
			],
		}).compileComponents();

		fixture = TestBed.createComponent(HeroFormComponent);
		component = fixture.componentInstance;
		heroService = TestBed.inject(HeroService);
		toastService = TestBed.inject(ToastService);
		router = TestBed.inject(Router);
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should initialize form with empty values", () => {
		expect(component.form.value).toEqual(defaultFormValue);
	});

	it("should call create method on submit when variant is create", () => {
		component.variant = "create";
		component.form.setValue(mockHero);
		fixture.detectChanges();

		const submitButton = fixture.debugElement.query(By.css('button[color="primary"]')).nativeElement;
		submitButton.click();

		expect(heroService.create).toHaveBeenCalledWith(component.form.getRawValue());
		expect(toastService.openFromComponent).toHaveBeenCalled();
	});

	it("should handle error on create method", async () => {
		heroService.create = jasmine.createSpy("create").and.returnValue(throwError("Error occurred"));
		component.variant = "create";
		component.form.setValue(mockHero);
		fixture.detectChanges();

		const submitButton = fixture.debugElement.query(By.css('button[color="primary"]')).nativeElement;
		submitButton.click();

		expect(heroService.create).toHaveBeenCalledWith(component.form.getRawValue());
		expect(toastService.openFromComponent).toHaveBeenCalledWith(jasmine.any(Function), {
			duration: 2500,
			data: { type: "error" },
		});
	});

	it("should call update method on submit when variant is update", () => {
		component.variant = "update";
		component.id = "1";
		component.form.setValue(mockHero);
		fixture.detectChanges();

		const submitButton = fixture.debugElement.query(By.css('button[color="primary"]')).nativeElement;
		submitButton.click();

		expect(heroService.update).toHaveBeenCalledWith("1", component.form.value);
		expect(toastService.openFromComponent).toHaveBeenCalled();
	});

	it("should handle error on update method", () => {
		heroService.update = jasmine.createSpy("update").and.returnValue(throwError("Error occurred"));
		component.variant = "update";
		component.id = "1";
		component.form.setValue(mockHero);
		fixture.detectChanges();

		const submitButton = fixture.debugElement.query(By.css('button[color="primary"]')).nativeElement;
		submitButton.click();

		expect(heroService.update).toHaveBeenCalledWith("1", component.form.value);
		expect(toastService.openFromComponent).toHaveBeenCalledWith(jasmine.any(Function), {
			duration: 2500,
			data: { type: "error" },
		});
	});

	it("should not update if no id is provided", () => {
		heroService.update = jasmine.createSpy("update").and.returnValue(throwError("Error occurred"));
		component.variant = "update";
		component.form.setValue(mockHero);
		fixture.detectChanges();

		const submitButton = fixture.debugElement.query(By.css('button[color="primary"]')).nativeElement;
		submitButton.click();

		expect(heroService.update).toHaveBeenCalledTimes(0);
	});

	it("should show error toast if form is invalid on submit", () => {
		component.variant = "create";
		component.form.controls["first_name"].setValue("");
		fixture.detectChanges();

		const submitButton = fixture.debugElement.query(By.css('button[color="primary"]')).nativeElement;
		submitButton.click();

		expect(toastService.openFromComponent).toHaveBeenCalledWith(jasmine.any(Function), {
			duration: 2500,
			data: {
				title: "Please fill in all required fields",
				type: "error",
			},
		});
	});

	it("should reset form on reset button click", () => {
		component.form.setValue(mockHero);
		fixture.detectChanges();

		const resetButton = fixture.debugElement.query(By.css('button[color="accent"]')).nativeElement;
		resetButton.click();

		expect(component.form.value).toEqual(defaultFormValue);
	});

	it("should navigate to the list page on cancel button click", () => {
		const navigateSpy = spyOn(router, "navigate");
		const cancelButton = fixture.debugElement.query(By.css('button[color="warn"]')).nativeElement;
		cancelButton.click();

		fixture.whenStable().then(() => {
			expect(navigateSpy).toHaveBeenCalledWith(["/heroes"]);
		});
	});

	it("should load hero data if variant is update and id is present", async () => {
		heroService.getById = jasmine.createSpy("getById").and.returnValue(of(mockHero));
		component.variant = "update";
		component.id = "1";
		component.load();
		fixture.detectChanges();

		expect(heroService.getById).toHaveBeenCalledWith("1");
		expect(component.subscriptions.length).toEqual(1);
		expect(component.form.value).toEqual(mockHero);
	});
});
