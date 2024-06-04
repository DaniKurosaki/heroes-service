import { TestBed } from "@angular/core/testing";
import { ThemeManagerService } from "./theme-manager.service";

describe("ThemeManagerService", () => {
	let service: ThemeManagerService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [ThemeManagerService],
		});
		service = TestBed.inject(ThemeManagerService);
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	it("should have the default theme as dark", () => {
		expect(service.theme).toBe("dark");
	});

	it("should set the theme correctly", () => {
		service.theme = "light";
		expect(service.theme).toBe("light");
		expect(document.body.className).toBe("light-theme");
	});

	it("should toggle the theme from dark to light", () => {
		service.theme = "dark";
		service.toggleTheme();
		expect(service.theme).toBe("light");
		expect(document.body.className).toBe("light-theme");
	});

	it("should toggle the theme from light to dark", () => {
		service.theme = "light";
		service.toggleTheme();
		expect(service.theme).toBe("dark");
		expect(document.body.className).toBe("dark-theme");
	});

	it("should emit the new theme when the theme is set", (done) => {
		service.theme$.subscribe((theme) => {
			if (theme === "light") {
				done();
			}
		});
		service.theme = "light";
		expect(service.theme).toBe("light");
	});
});
