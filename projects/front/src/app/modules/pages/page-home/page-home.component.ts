import { DialogData } from "./../../core/components/modal-confirm/modal-confirm.component";
import { CommonModule } from "@angular/common";
import { AfterViewInit, Component, ViewChild, inject, isDevMode } from "@angular/core";
import { Router } from "@angular/router";

import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";

import { CommonComponent } from "../../core/components/common/common.component";
import { ModalConfirmComponent } from "../../core/components/modal-confirm/modal-confirm.component";

import { HeroService } from "../../core/services/hero.service";
import { HeroKeysLocalized } from "../../shared/enums/hero.enum";
import { RouteEnum } from "../../core/constants/routes";
import { IHero } from "../../../../../../back/src/interfaces/hero.interface";
import { Genders } from "../../../../../../back/src/enums/common.enum";
import { GenderLocalized } from "../../shared/enums/common.enum";

type ExtraColumns = "edit" | "delete";

const ExtraColumnsLocalized: Record<ExtraColumns, string> = {
	["edit"]: "Edit",
	["delete"]: "Delete",
};

type DialogTexts = keyof DialogData;

const DialogTextsLocalized: Record<DialogTexts, string> = {
	["title"]: "Are you sure you want to delete ",
	["cancelText"]: "Cancel",
	["confirmText"]: "Confirm",
};

type Messages = "NO_DATA_MATCHING";

const MessagesLocalized: Record<Messages, string> = {
	["NO_DATA_MATCHING"]: "No data matching the filter ",
};

@Component({
	selector: "page-home",
	standalone: true,
	imports: [CommonModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatPaginator, MatSortModule, MatTableModule],
	templateUrl: "./page-home.component.html",
	styleUrl: "./page-home.component.scss",
})
export class PageHomeComponent extends CommonComponent implements AfterViewInit {
	protected readonly router: Router = inject(Router);
	protected readonly dialog: MatDialog = inject(MatDialog);
	protected readonly heroService: HeroService = inject(HeroService);
	@ViewChild(MatPaginator) paginator!: MatPaginator;
	// TODO - Fix this, not working for some strange reason
	@ViewChild(MatSort) sort!: MatSort;

	public dataSource: MatTableDataSource<IHero> = new MatTableDataSource<IHero>();

	protected readonly displayedColumns: (keyof IHero | ExtraColumns)[] = ["first_name", "last_name", "hero_name", "gender", "edit", "delete"];
	protected readonly GenderLocalized: Record<Genders, string> = GenderLocalized;
	protected readonly localizedColumns: Record<keyof IHero, string> = HeroKeysLocalized;
	protected readonly localizedExtraColumns: Record<ExtraColumns, string> = ExtraColumnsLocalized;
	protected readonly localizedMessages: Record<Messages, string> = MessagesLocalized;

	override load(): void {
		this.subscriptions.push(
			this.heroService.getAll().subscribe({
				next: (data) => {
					this.dataSource = new MatTableDataSource<IHero>(data);
				},
				error: (error) => {
					if (isDevMode()) console.error(error);
				},
			})
		);
	}

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
		this.dataSource.sortingDataAccessor = (item: IHero, property: string) => {
console.log("item", item);
console.log("property", property);

			switch (property) {
				case "first_name":
					return item.first_name.toLowerCase();
				case "last_name":
					return item.last_name.toLowerCase();
				case "hero_name":
					return item.hero_name.toLowerCase();
				case "gender":
					return item.gender;
				default:
					return item[property as keyof IHero] + "";
			}
		};
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (!this.dataSource.paginator) return;
		this.dataSource.paginator.firstPage();
	}

	public interact(action: ExtraColumns, hero: IHero): void {
		this[action](hero);
	}

	public edit(hero: IHero): void {
		this.router.navigate([RouteEnum.EDIT, hero.id]);
	}

	public delete(hero: IHero): void {
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

			this.heroService.deleteById(hero.id).subscribe((data) => {
				const index = this.dataSource.data.findIndex((item) => item.id === hero.id);
				this.dataSource.data.splice(index, 1);
				this.dataSource._updateChangeSubscription();
			});
		});
	}
}
