import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeaderComponent } from "./header.component";
import { ThemeManagerService } from "../../services/theme-manager.service";
import { RouterTestingModule } from "@angular/router/testing";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule, MatSelectChange } from "@angular/material/select";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";
import { Router } from "@angular/router";
import { LocalesList } from "../../../shared/enums/common.enum";
import { Locales } from "../../../shared/interfaces/common.interface";

describe("HeaderComponent", () => {
	let component: HeaderComponent;
	let fixture: ComponentFixture<HeaderComponent>;
	let themeManagerService: ThemeManagerService;
	let router: Router;

	beforeEach(async () => {
		const themeManagerServiceMock = {
			toggleTheme: jasmine.createSpy("toggleTheme"),
			theme: "light",
		};

		await TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				HeaderComponent,
				MatButtonModule,
				MatToolbarModule,
				MatSlideToggleModule,
				MatFormFieldModule,
				MatSelectModule,
				BrowserAnimationsModule,
			],
			declarations: [],
			providers: [{ provide: ThemeManagerService, useValue: themeManagerServiceMock }],
		}).compileComponents();

		router = TestBed.inject(Router);
		fixture = TestBed.createComponent(HeaderComponent);
		component = fixture.componentInstance;
		themeManagerService = TestBed.inject(ThemeManagerService);
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should initialize with the correct locale", () => {
		expect(component.selectedLocale).toBe("en"); // Assuming 'en' is the default locale
	});

	it("should call toggleTheme on theme toggle change", () => {
		const toggle = fixture.debugElement.query(By.css(".theme-toggle")).nativeElement;
		toggle.dispatchEvent(new Event("change"));
		expect(themeManagerService.toggleTheme).toHaveBeenCalled();
	});

	it("should update locale on change", () => {
		component.changeLocale = jasmine.createSpy("changeLocale");
		const select = fixture.debugElement.query(By.css("mat-select")).nativeElement;
		select.dispatchEvent(new Event("selectionChange", { detail: { value: "es" } } as CustomEvent));
		fixture.detectChanges();
		expect(component.changeLocale).toHaveBeenCalled();
	});

	it("should set the theme icons correctly on ngAfterViewInit", () => {
		component.ngAfterViewInit();
		const switchElement = fixture.debugElement.query(By.css(".theme-toggle")).nativeElement;
		const onIcon = switchElement.querySelector(".mdc-switch__icon--on").firstChild.getAttribute("d");
		const offIcon = switchElement.querySelector(".mdc-switch__icon--off").firstChild.getAttribute("d");
		expect(onIcon).toBe(component["moon"]);
		expect(offIcon).toBe(component["sun"]);
	});

	it("should have the correct number of tabs", () => {
		const tabs = fixture.debugElement.queryAll(By.css(".tab"));
		expect(tabs.length).toBe(component.tabs.length);
	});

	// it("should have the correct routerLink for each tab", () => {
	// 	const tabs = fixture.debugElement.queryAll(By.css(".tab"));
	// 	tabs.forEach((tab: DebugElement, index: number) => {
	// 		expect(tab.attributes["routerLink"]).toBe(component.tabs[index].key);
	// 	});
	// });

	it("should display the correct locale flags in the select options", () => {
		const options = fixture.debugElement.queryAll(By.css("mat-option"));
		options.forEach((option: DebugElement, index: number) => {
			const localeKey = Object.keys(LocalesList)[index] as Locales;
			const localeValue = component.locales[localeKey];
			expect(option.query(By.css("img")).attributes["src"]).toContain(localeKey);
			expect(option.query(By.css("img")).attributes["alt"]).toBe(localeValue);
		});
	});
});
