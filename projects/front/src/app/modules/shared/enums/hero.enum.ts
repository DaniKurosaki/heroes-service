import { IHero } from "../../../../../../back/src/interfaces/hero.interface";

export const HeroKeysLocalized: Record<keyof IHero, string> = {
	["id"]: "ID",
	["first_name"]: "First Name",
	["last_name"]: "Last Name",
	["hero_name"]: "Hero Name",
	["secret_identity"]: "Secret Identity",
	["gender"]: "Gender",
	["birth_date"]: "Birth Date",
	["superpower"]: "Superpower",
	["team_affiliation"]: "Team Affiliation",
};
