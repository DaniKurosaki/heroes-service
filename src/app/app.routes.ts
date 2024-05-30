import { Routes } from "@angular/router";
import { RouteEnum } from "./modules/core/constants/routes";
import { PageHomeComponent } from "./modules/pages/page-home/page-home.component";
import { PageCreateComponent } from "./modules/pages/page-create/page-create.component";
import { PageEditComponent } from "./modules/pages/page-edit/page-edit.component";

export const routes: Routes = [
	{
		path: "",
		redirectTo: RouteEnum.HOME,
		pathMatch: "full",
	},
	{
		path: RouteEnum.HOME,
		component: PageHomeComponent,
	},
	{
		path: RouteEnum.CREATE,
		component: PageCreateComponent,
	},
	{
		path: RouteEnum.EDIT + "/:id",
		component: PageEditComponent,
	},
	{ path: "**", redirectTo: RouteEnum.HOME },
];
