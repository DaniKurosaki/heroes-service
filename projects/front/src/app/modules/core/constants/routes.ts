import { KeyValuePair } from "../../shared/interfaces/common.interface";

export enum RouteEnum {
	HEROES = "heroes",
}

export enum HeroSubRouteEnum {
	LIST = `${RouteEnum.HEROES}/list`,
	CREATE = `${RouteEnum.HEROES}/create`,
	EDIT = `${RouteEnum.HEROES}/edit`,
}

export const NavbarRoutesLocalized: KeyValuePair[] = [
	{ key: HeroSubRouteEnum.LIST, value: "Heroes" },
];
