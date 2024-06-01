import { Routes } from "@angular/router";
import { heroesRoutes } from "./modules/features/heroes/heroes.routing";
import { RouteEnum } from "./modules/core/constants/routes";

export const routes: Routes = [
	{
		path: "",
		redirectTo: RouteEnum.HEROES,
		pathMatch: "full",
	},
	{
		path: RouteEnum.HEROES,
		loadChildren: () => heroesRoutes,
	},
	{ path: "**", redirectTo: RouteEnum.HEROES },
];
