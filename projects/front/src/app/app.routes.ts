import { Routes } from "@angular/router";
import { HeroSubRouteEnum } from "./modules/core/constants/routes";
import { HeroListComponent } from "./modules/features/heroes/pages/hero-list/hero-list.component";
import { HeroCreateComponent } from "./modules/features/heroes/pages/hero-create/hero-create.component";
import { HeroEditComponent } from "./modules/features/heroes/pages/hero-edit/hero-edit.component";

export const routes: Routes = [
	{
		path: "",
		redirectTo: HeroSubRouteEnum.LIST,
		pathMatch: "full",
	},
	{
		path: HeroSubRouteEnum.LIST,
		component: HeroListComponent,
	},
	{
		path: HeroSubRouteEnum.CREATE,
		component: HeroCreateComponent,
	},
	{
		path: `${HeroSubRouteEnum.EDIT}/:id`,
		component: HeroEditComponent,
	},
	{ path: "**", redirectTo: HeroSubRouteEnum.LIST },
];
