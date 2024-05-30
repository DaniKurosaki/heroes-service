import { KeyValuePair } from "../../shared/interfaces/generic.interface";

export enum RouteEnum {
	HOME = "home",
	CREATE = "create",
	EDIT = "edit",
}

export const RouteEnumLocalized: KeyValuePair<RouteEnum>[] = [
	{ key: RouteEnum.HOME, value: "Home" },
	{ key: RouteEnum.CREATE, value: "Create" },
	{ key: RouteEnum.EDIT, value: "Edit" },
];
