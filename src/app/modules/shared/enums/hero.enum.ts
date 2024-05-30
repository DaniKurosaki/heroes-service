import { Hero } from "../interfaces/hero.interface";

export const HeroSuperpowers = ["flight", "super strength", "invisibility", "telekinesis", "teleportation"] as const;

export type HeroSuperpower = (typeof HeroSuperpowers)[number];

export const HeroTeamAffiliations = ["Avengers", "Justice League", "X-Men", "Fantastic Four"] as const;

export type HeroTeamAffiliation = (typeof HeroTeamAffiliations)[number];

export const HeroKeysLocalized: Record<keyof Hero, string> = {
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
