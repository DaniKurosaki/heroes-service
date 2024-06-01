import { KeyValuePair } from "../../shared/interfaces/common.interface";

export enum RouteEnum {
	HEROES = "heroes",
}

export enum HeroSubRouteEnum {
	LIST = `list`,
	CREATE = `create`,
	EDIT = `edit`,
}

export const NavbarRoutesLocalized: KeyValuePair[] = [
	{ key: `${RouteEnum.HEROES}/${HeroSubRouteEnum.LIST}`, value: "Heroes" },
];
