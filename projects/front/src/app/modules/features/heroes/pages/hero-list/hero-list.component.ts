import { HeroKeysLocalized } from "./../../enums/hero.enum";
import { CommonModule } from "@angular/common";
import { Subject, debounceTime, distinctUntilChanged } from "rxjs";
import { AfterViewInit, Component, ViewChild, inject, isDevMode } from "@angular/core";
import { Router, RouterModule } from "@angular/router";

import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginator } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";

import { CommonComponent } from "../../../../core/components/common/common.component";
import { DialogData, ModalConfirmComponent } from "../../../../core/components/modal-confirm/modal-confirm.component";

import { HeroService } from "../../services/hero.service";
import { GenderLocalized } from "../../../../shared/enums/common.enum";
import { HeroSubRouteEnum, RouteEnum } from "../../../../core/constants/routes";
import { IHero } from "../../../../../../../../back/src/interfaces/hero.interface";

/**
 * Extra columns for the table that are not part of the data model
 */
type ExtraColumns = "edit" | "delete";

/**
 * Localized texts for the extra columns
 
 */
const ExtraColumnsLocalized: Record<ExtraColumns, string> = {
	["edit"]: "Edit",
	["delete"]: "Delete",
};

/**
 * Localized text keys for dialog's messages
 */
type DialogTexts = keyof DialogData;

/**
 * Localized texts for the dialog messages
 */
const DialogTextsLocalized: Record<DialogTexts, string> = {
	["title"]: "Are you sure you want to delete ",
	["cancelText"]: "Cancel",
	["confirmText"]: "Confirm",
};

/**
 * Localized text keys for this component messages
 */
type Messages = "NO_DATA_MATCHING" | "NO_DATA" | "ERROR" | "FILTER" | "ADD";

/**
 * Localized texts for this component messages
 */
const MessagesLocalized: Record<Messages, string> = {
	["NO_DATA_MATCHING"]: "No data matching the filter ",
	["NO_DATA"]: "No data to display",
	["ERROR"]: "An error occurred while processing the request",
	["FILTER"]: "Filter",
	["ADD"]: "Add new hero",
};

/**
 * This page serve as the home page for the application, it displays a table with all the heroes and allows the user to interact with them
 */
@Component({
	selector: "hero-list",
	standalone: true,
	imports: [
		CommonModule,
		RouterModule,
		MatButtonModule,
		MatFormFieldModule,
		MatIconModule,
		MatInputModule,
		MatPaginator,
		MatProgressSpinnerModule,
		MatSortModule,
		MatTableModule,
	],
	templateUrl: "./hero-list.component.html",
	styleUrl: "./hero-list.component.scss",
})
export class HeroListComponent extends CommonComponent implements AfterViewInit {
	/**
	 * Injected dependency for Router
	 */
	protected readonly router: Router = inject(Router);

	/**
	 * Injected dependency for Material Dialog
	 */
	protected readonly dialog: MatDialog = inject(MatDialog);

	/**
	 * Injected dependency for Hero Service
	 */
	protected readonly heroService: HeroService = inject(HeroService);

	/**
	 * Table's paginator
	 */
	@ViewChild(MatPaginator) paginator!: MatPaginator;

	/**
	 * Table's sort
	 */
	@ViewChild(MatSort) sort!: MatSort;

	/**
	 * Table's data source
	 */
	public dataSource: MatTableDataSource<IHero> = new MatTableDataSource<IHero>();

	/**
	 * Filter queue to debounce the filter input
	 */
	public filterQueue$: Subject<string> = new Subject<string>();

	/**
	 * Columns to be displayed in the table
	 */
	protected readonly displayedColumns: (keyof IHero | ExtraColumns)[] = ["first_name", "last_name", "hero_name", "gender", "edit", "delete"];

	/**
	 * Localized texts for the Genders
	 */
	protected readonly GenderLocalized: Record<string, string> = GenderLocalized;

	/**
	 * Localized texts for the Hero keys
	 */
	protected readonly localizedColumns: Record<keyof IHero, string> = HeroKeysLocalized;

	/**
	 * Localized texts for the extra columns
	 */
	protected readonly localizedExtraColumns: Record<ExtraColumns, string> = ExtraColumnsLocalized;

	/**
	 * Localized texts for the dialog messages
	 */
	protected readonly localizedMessages: Record<Messages, string> = MessagesLocalized;

	/**
	 * Reference to the RouteEnum
	 */
	protected readonly RouteEnum = RouteEnum;

	/**
	 * Reference to the HeroSubRouteEnum
	 */
	protected readonly HeroSubRouteEnum = HeroSubRouteEnum;

	/**
	 * Override of the load method to fetch the data from the Hero Service
	 */
	override load(): void {
		this.subscriptions.push(
			this.heroService.getAll().subscribe({
				next: (data) => {
					if (!data.length) return;

					this.dataSource.data = data;
				},
				error: (error) => {
					if (isDevMode()) console.error(error);
				},
			}),

			this.filterQueue$.pipe(debounceTime(300), distinctUntilChanged()).subscribe((filterValue) => {
				this.dataSource.filter = filterValue.trim().toLowerCase();

				if (!this.dataSource.paginator) return;
				this.dataSource.paginator.firstPage();
				this.dataSource._updatePaginator(this.dataSource.filteredData.length);
			})
		);
	}

	/**
	 * After view init lifecycle hook
	 */
	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}

	/**
	 * Sends the filter value to the filter queue
	 * @param event
	 */
	protected applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;

		this.filterQueue$.next(filterValue);
	}

	/**
	 * Interact with the hero based on the action
	 * @param action Action to be performed
	 * @param hero Hero to interact with
	 */
	protected interact(action: ExtraColumns, hero: IHero): void {
		this[action](hero);
	}

	/**
	 * Redirects to the edit page
	 * @param hero Hero to be edited, ID is passed as a parameter to the route
	 */
	private edit(hero: IHero): void {
		this.router.navigate([HeroSubRouteEnum.EDIT, hero.id]);
	}

	/**
	 * Opens a dialog to confirm the deletion of the hero.
	 * If the action is confirmed, calls the delete method from the Hero Service and updates the table.
	 * @param hero Hero to be deleted
	 */
	private delete(hero: IHero): void {
		const dialogRef = this.dialog.open(ModalConfirmComponent, {
			data: {
				title: `${DialogTextsLocalized["title"]} ${hero.hero_name}?`,
				cancelText: DialogTextsLocalized["cancelText"],
				confirmText: DialogTextsLocalized["confirmText"],
			},
		});

		dialogRef.backdropClick().subscribe((_) => dialogRef.close());

		dialogRef.afterClosed().subscribe((result) => {
			if (!result) return;

			this.heroService.deleteById(hero.id).subscribe({
				next: (_) => {
					const index = this.dataSource.data.findIndex((item) => item.id === hero.id);
					this.dataSource.data.splice(index, 1);
					this.dataSource._updateChangeSubscription();
				},
				error: (error) => {
					if (isDevMode()) console.error(error);
				},
			});
		});
	}
}
