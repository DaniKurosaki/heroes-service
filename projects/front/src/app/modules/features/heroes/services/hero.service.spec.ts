import { environment as envDev } from "./../../../../../environments/environment.dev";
import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { HeroService } from "./hero.service";
import { environment } from "../../../../../environments/environment";
import { IHero, IHeroCreate } from "../../../../../../../back/src/interfaces/hero.interface";
import { heroesMock } from "../pages/mocks/hero.mock";

describe("HeroService", () => {
	let service: HeroService;
	let httpMock: HttpTestingController;
	const apiUrl = `${environment.apiUrl}${environment.apiPort ? ":" + environment.apiPort : ""}${environment.apiPath}/heroes`;

	let mockHeroes: IHero[] = [];

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [HeroService],
		});
		service = TestBed.inject(HeroService);
		httpMock = TestBed.inject(HttpTestingController);

		mockHeroes = [...heroesMock];
	});

	afterEach(() => {
		httpMock.verify();
	});

	it("should be created", () => {
		expect(service).toBeTruthy();
	});

	it("should retrieve all heroes", () => {
		service.getAll().subscribe((heroes) => {
			expect(heroes.length).toBe(2);
			expect(heroes).toEqual(mockHeroes);
		});

		const req = httpMock.expectOne(apiUrl);
		expect(req.request.method).toBe("GET");
		req.flush(mockHeroes);
	});

	it("should retrieve a hero by id", () => {
		service.getById("1").subscribe((hero) => {
			expect(hero).toEqual(mockHeroes[0]);
		});

		const req = httpMock.expectOne(`${apiUrl}/1`);
		expect(req.request.method).toBe("GET");
		req.flush(mockHeroes[0]);
	});

	it("should create a new hero", () => {
		const newHero: IHeroCreate = { ...mockHeroes[0] };
		const createdHero: IHero = { id: "3", ...newHero };

		service.create(newHero).subscribe((hero) => {
			expect(hero).toEqual(createdHero);
		});

		const req = httpMock.expectOne(apiUrl);
		expect(req.request.method).toBe("POST");
		req.flush(createdHero);
	});

	it("should update a hero", () => {
		const updatedHero: Partial<IHeroCreate> = { ...mockHeroes[0], superpower: "telekinesis" };
		const returnedHero: IHero = { ...mockHeroes[0], superpower: "telekinesis" };

		service.update("1", updatedHero).subscribe((hero) => {
			expect(hero.superpower).toEqual("telekinesis");
		});

		const req = httpMock.expectOne(`${apiUrl}/1`);
		expect(req.request.method).toBe("PUT");
		req.flush(returnedHero);
	});

	it("should delete a hero by id", () => {
		const deletedHero: IHero = { ...mockHeroes[0] };

		service.deleteById("1").subscribe((hero) => {
			expect(hero).toEqual(deletedHero);
		});

		const req = httpMock.expectOne(`${apiUrl}/1`);
		expect(req.request.method).toBe("DELETE");
		req.flush(deletedHero);
	});
});
