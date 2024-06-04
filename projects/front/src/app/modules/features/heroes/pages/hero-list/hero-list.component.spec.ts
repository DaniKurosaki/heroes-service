import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { of, Subject, throwError } from "rxjs";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";

import { HeroListComponent } from "./hero-list.component";
import { HeroService } from "../../services/hero.service";
import { IHero } from "../../../../../../../../back/src/interfaces/hero.interface";
import { CapitalizePipe } from "../../../../shared/pipes/capitalize.pipe";
import { heroesMock } from "../mocks/hero.mock";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { HeroSubRouteEnum, RouteEnum } from "../../../../core/constants/routes";
import { ToastService } from "../../../../core/services/toast.service";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { By } from "@angular/platform-browser";
import { mapKeysToArray } from "../../../../shared/utils/mappers.util";

describe("HeroListComponent", () => {
	let component: HeroListComponent;
	let fixture: ComponentFixture<HeroListComponent>;
	let heroService: HeroService;
	let dialog: MatDialog;
	let router: Router;
	let filterQueue$: Subject<string>;

	let mockHeroes: IHero[] = [];

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				CommonModule,
				HttpClientTestingModule,
				HeroListComponent,
				CapitalizePipe,
				MatDialogModule,
				MatPaginatorModule,
				MatSortModule,
				MatTableModule,
				BrowserAnimationsModule,
				NoopAnimationsModule,

				MatFormFieldModule,
				MatIconModule,
				MatInputModule,
				MatProgressSpinnerModule,
				RouterModule.forRoot([]),
			],
			providers: [
				{ provide: HeroService, useValue: { getAll: () => of(mockHeroes), deleteById: (id: string) => of({}) } },
				{ provide: ToastService, useValue: { openFromComponent: () => {} } },
				{
					provide: MatDialog,
					useValue: {
						open: () => ({
							afterClosed: () => of(true),
							backdropClick: () => of(),
						}),
					},
				},
				{
					provide: ActivatedRoute,
					useValue: {
						snapshot: {
							paramMap: {
								get: (key: string) => "1",
							},
						},
					},
				},
			],
		}).compileComponents();

		fixture = TestBed.createComponent(HeroListComponent);
		component = fixture.componentInstance;
		heroService = TestBed.inject(HeroService);
		router = TestBed.inject(Router);
		dialog = TestBed.inject(MatDialog);
		filterQueue$ = component.filterQueue$;
	});

	beforeEach(() => {
		mockHeroes = [...heroesMock];
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should load heroes on init", () => {
		component.load();
		expect(component.dataSource.data).toEqual(mockHeroes);
	});

	it("should load heroes on init if no heroes are found", () => {
		heroService.getAll = jasmine.createSpy("getAll").and.returnValue(of([]));
		component.load();
		expect(component.dataSource.data.length).toEqual(0);
	});

	it("should handle error when loading heroes", () => {
		heroService.getAll = jasmine.createSpy("getAll").and.returnValue(throwError("error"));
		spyOn(console, "error");
		component.load();
		expect(console.error).toHaveBeenCalledWith("error");
	});

	it("should apply filter to the data source", () => {
		component.dataSource.data = mockHeroes;
		component["applyFilter"]({ target: { value: "Doe" } } as unknown as Event);
		expect(component.dataSource.filteredData.length).toBe(2);
		expect(component.dataSource.filteredData[0].hero_name).toBe(heroesMock[0].hero_name);
	});

	it("should open delete confirmation dialog and delete hero", () => {
		heroService.deleteById = jasmine.createSpy("deleteById").and.returnValue(of(mockHeroes[0]));
		spyOn(dialog, "open").and.callThrough();

		component["interact"]("delete", mockHeroes[0]);

		expect(heroService.deleteById).toHaveBeenCalledWith("1");
		expect(dialog.open).toHaveBeenCalled();
	});

	it("should handle error when deleting hero", () => {
		heroService.deleteById = jasmine.createSpy("deleteById").and.returnValue(throwError("error"));
		spyOn(console, "error");
		component["interact"]("delete", mockHeroes[0]);
		expect(console.error).toHaveBeenCalledWith("error");
	});

	it("should navigate to edit hero page", () => {
		spyOn(router, "navigate");
		component["interact"]("edit", mockHeroes[0]);
		expect(router.navigate).toHaveBeenCalledWith([RouteEnum.HEROES, HeroSubRouteEnum.EDIT, "1"]);
	});

	// it("should handle filter queue and update paginator", fakeAsync(() => {
	// 	component.paginator = fixture.debugElement.query(By.directive(MatPaginator)).componentInstance;
	// 	component.dataSource.data = mockHeroes;
	// 	component.ngAfterViewInit();
	// 	component.filterQueue$.next("");
	// 	component.filterQueue$.next("Doe");

	// 	tick(500);

	// 	expect(component.dataSource.filter).toBe("Doe");
	// 	expect(component.dataSource.paginator?.pageIndex).toBe(0);
	// }));

	it("should set paginator and sort after view init", () => {
		component.paginator = fixture.debugElement.query(By.directive(MatPaginator)).componentInstance;

		component.ngAfterViewInit();

		expect(component.dataSource.paginator).toBe(component.paginator);
		expect(component.dataSource.sort).toBe(component.sort);
	});

	it("should update paginator label after view init", () => {
		component.paginator = fixture.debugElement.query(By.directive(MatPaginator)).componentInstance;

		component.ngAfterViewInit();

		expect(component.paginator._intl.itemsPerPageLabel).toBe("Items per page");
	});

	it("should handle filterQueue$ correctly with debounceTime and distinctUntilChanged", fakeAsync(() => {
		component.paginator = fixture.debugElement.query(By.directive(MatPaginator)).componentInstance;

		component.dataSource.paginator = component.paginator;

		spyOn(component.dataSource, "_updatePaginator").and.callThrough();
		spyOn(component.dataSource.paginator, "firstPage");

		component.dataSource.data = mockHeroes;
		component.ngAfterViewInit();

		component.filterQueue$.next("Doe");
		tick(300); // Simulate the debounce time

		expect(component.dataSource._updatePaginator).toHaveBeenCalled();
	}));
});
