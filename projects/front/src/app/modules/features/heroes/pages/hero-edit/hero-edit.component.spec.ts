import { RouterTestingModule } from "@angular/router/testing";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ActivatedRoute } from "@angular/router";
import { HeroEditComponent } from "./hero-edit.component";
import { HeroService } from "../../services/hero.service";
import { HeroFormComponent } from "../../components/hero-form/hero-form.component";
import { CommonModule } from "@angular/common";
import { heroesRoutes } from "../../heroes.routing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

describe("HeroEditComponent", () => {
	let component: HeroEditComponent;
	let fixture: ComponentFixture<HeroEditComponent>;
	let heroService: HeroService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [HttpClientTestingModule, HeroEditComponent, NoopAnimationsModule],
			providers: [
				HeroService,
				{
					provide: ActivatedRoute,
					useValue: {
						snapshot: {
							paramMap: {
								get: (key: string) => "1",
							},
							params: { id: "1" },
						},
					},
				},
			],
		}).compileComponents();

		heroService = TestBed.inject(HeroService);
		fixture = TestBed.createComponent(HeroEditComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
