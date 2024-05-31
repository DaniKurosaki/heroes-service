import { Genders } from "../enums/common.enum";
import { HeroSuperpower, HeroTeamAffiliation } from "../enums/hero.enum";

export interface Hero {
	id: string;
	first_name: string;
	last_name: string;
	hero_name: string;
	secret_identity: boolean;
	gender: Genders;
	birth_date: string;
	superpower: HeroSuperpower;
	team_affiliation: HeroTeamAffiliation;
}
