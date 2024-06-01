import { Gender } from "../enums/common.enum";
import { HeroSecretIdentityStatus, HeroSuperpower, HeroTeamAffiliation } from "../enums/hero.enum";

export interface IHero {
	id: string;
    first_name: string;
    last_name: string;
    hero_name: string;
    birth_date: string;
    secret_identity: HeroSecretIdentityStatus;
    gender: Gender;
    superpower: HeroSuperpower;
    team_affiliation: HeroTeamAffiliation;
}

export type IHeroCreate = Omit<IHero, "id">;