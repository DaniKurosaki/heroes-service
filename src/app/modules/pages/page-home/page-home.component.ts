import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { Observable } from "rxjs";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";

import { Hero } from "../../shared/interfaces/hero.interface";
import { HeroService } from "../../core/services/hero.service";
import { GenderLocalized, Genders } from "../../shared/enums/generic.enum";
import { HeroKeysLocalized } from "../../shared/enums/hero.enum";
import { Router } from "@angular/router";
import { RouteEnum } from "../../core/constants/routes";

type ExtraColumns = "edit" | "delete";

const ExtraColumnsLocalized: Record<ExtraColumns, string> = {
	["edit"]: "Edit",
	["delete"]: "Delete",
};

@Component({
	selector: "page-home",
	standalone: true,
	imports: [CommonModule, MatButtonModule, MatIconModule, MatTableModule],
	templateUrl: "./page-home.component.html",
	styleUrl: "./page-home.component.scss",
})
export class PageHomeComponent {
	protected readonly router: Router = inject(Router);
	protected readonly heroService: HeroService = inject(HeroService);

	public data$?: Observable<Hero[]> = this.heroService.get();

	protected readonly displayedColumns: (keyof Hero | ExtraColumns)[] = ["first_name", "last_name", "hero_name", "gender", "edit", "delete"];
	protected readonly localizedColumns: Record<keyof Hero, string> = HeroKeysLocalized;
	protected readonly localizedExtraColumns: Record<ExtraColumns, string> = ExtraColumnsLocalized;
	protected readonly GenderLocalized: Record<Genders, string> = GenderLocalized;

	public interact(action: ExtraColumns, id: string): void {
		this[action](id);
	}

	public edit(id: string): void {
		this.router.navigate([RouteEnum.EDIT, id]);
	}

	public delete(id: string): void {
		// this.heroService.deleteById(id);
	}
}
