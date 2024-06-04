import { ComponentFixture, TestBed } from "@angular/core/testing";

import { HeroCreateComponent } from "./hero-create.component";
import { ActivatedRoute } from "@angular/router";
import { HeroService } from "../../services/hero.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

describe("HeroCreateComponent", () => {
	let component: HeroCreateComponent;
	let fixture: ComponentFixture<HeroCreateComponent>;
	let heroService: HeroService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [HttpClientTestingModule, HeroCreateComponent, NoopAnimationsModule],
			providers: [
				HeroService,
				{
					provide: ActivatedRoute,
					useValue: {
						snapshot: {
							paramMap: {
								get: (key: string) => "1",
							},
							params: {},
						},
					},
				},
			],
		}).compileComponents();

		heroService = TestBed.inject(HeroService);
		fixture = TestBed.createComponent(HeroCreateComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
