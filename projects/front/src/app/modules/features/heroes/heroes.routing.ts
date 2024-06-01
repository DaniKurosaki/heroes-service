import { Routes } from "@angular/router";
import { HeroSubRouteEnum } from "../../core/constants/routes";
import { HeroListComponent } from "./pages/hero-list/hero-list.component";
import { HeroCreateComponent } from "./pages/hero-create/hero-create.component";
import { HeroEditComponent } from "./pages/hero-edit/hero-edit.component";

export const heroesRoutes: Routes = [
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
