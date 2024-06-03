import { KeyValuePair } from "../../shared/interfaces/common.interface";

/**
 * Routes for the application in an enum.
 */
export enum RouteEnum {
	HEROES = "heroes",
}

/**
 * Sub routes for the Heroes module in an enum.
 */
export enum HeroSubRouteEnum {
	LIST = `list`,
	CREATE = `create`,
	EDIT = `edit`,
}

/**
 * Navbar routes localized.
 */
export const NavbarRoutesLocalized: KeyValuePair[] = [
	{ key: `${RouteEnum.HEROES}/${HeroSubRouteEnum.LIST}`, value: $localize`:@@NavbarRoutes.Heroes:Heroes` },
];
