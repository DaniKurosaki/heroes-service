import { IHero } from "../../../../../../back/src/interfaces/hero.interface";
import { HeroSecretIdentityStatus, HeroSuperpower, HeroTeamAffiliation } from "./../../../../../../back/src/enums/hero.enum";

export const HeroKeysLocalized: Record<keyof IHero, string> = {
	["id"]: "ID",
	["first_name"]: "First Name",
	["last_name"]: "Last Name",
	["hero_name"]: "Hero Name",
	["birth_date"]: "Birth Date",
	["secret_identity"]: "Secret Identity",
	["gender"]: "Gender",
	["superpower"]: "Superpower",
	["team_affiliation"]: "Team Affiliation",
};

export const HeroSecretIdentityStatusLocalized: Record<HeroSecretIdentityStatus, string> = {
	["public"]: "Public",
	["secret"]: "Secret",
};

export const HeroSuperpowerLocalized: Record<HeroSuperpower, string> = {
	["flight"]: "Flight",
	["super-strength"]: "Super Strength",
	["invisibility"]: "Invisibility",
	["telekinesis"]: "Telekinesis",
	["teleportation"]: "Teleportation",
};

export const HeroTeamAffiliationLocalized: Record<HeroTeamAffiliation, string> = {
	["avengers"]: "Avengers",
	["justice-league"]: "Justice League",
	["x-men"]: "X-Men",
	["fantastic-four"]: "Fantastic Four",
};
