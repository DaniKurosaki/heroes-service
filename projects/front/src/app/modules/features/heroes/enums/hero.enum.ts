import { HeroSecretIdentityStatus, HeroSuperpower, HeroTeamAffiliation } from "../../../../../../../back/src/enums/hero.enum";
import { IHero } from "../../../../../../../back/src/interfaces/hero.interface";

/** 
* Localized keys for the Hero model
*/
export const HeroKeysLocalized: Record<keyof IHero, string> = {
	["id"]: $localize`:@@HeroKeys.ID:ID`,
	["first_name"]: $localize`:@@HeroKeys.FirstName:First Name`,
	["last_name"]: $localize`:@@HeroKeys.LastName:Last Name`,
	["hero_name"]: $localize`:@@HeroKeys.HeroName:Hero Name`,
	["birth_date"]: $localize`:@@HeroKeys.BirthDate:Birth Date`,
	["secret_identity"]: $localize`:@@HeroKeys.SecretIdentity:Secret Identity`,
	["gender"]: $localize`:@@HeroKeys.Gender:Gender`,
	["superpower"]: $localize`:@@HeroKeys.Superpower:Super Power`,
	["team_affiliation"]: $localize`:@@HeroKeys.TeamAffiliation:Team Affiliation`,
};

/**
 * Localized keys for the Hero secret identity status
 */
export const HeroSecretIdentityStatusLocalized: Record<HeroSecretIdentityStatus, string> = {
	["public"]: $localize`:@@HeroSecretIdentityStatus.Public:Public`,
	["secret"]: $localize`:@@HeroSecretIdentityStatus.Secret:Secret`,
};

/**
 * Localized keys for the Hero superpower
 */
export const HeroSuperpowerLocalized: Record<HeroSuperpower, string> = {
	["flight"]: $localize`:@@HeroSuperpower.Flight:Flight`,
	["super-strength"]: $localize`:@@HeroSuperpower.SuperStrength:Super Strength`,
	["invisibility"]: $localize`:@@HeroSuperpower.Invisibility:Invisibility`,
	["telekinesis"]: $localize`:@@HeroSuperpower.Telekinesis:Telekinesis`,
	["teleportation"]: $localize`:@@HeroSuperpower.Teleportation:Teleportation`,
};

/**
 * Localized keys for the Hero team affiliation
 */
export const HeroTeamAffiliationLocalized: Record<HeroTeamAffiliation, string> = {
	["avengers"]: $localize`:@@HeroTeamAffiliation.Avengers:Avengers`,
	["justice-league"]: $localize`:@@HeroTeamAffiliation.JusticeLeague:Justice League`,
	["x-men"]: $localize`:@@HeroTeamAffiliation.XMen:X-Men`,
	["fantastic-four"]: $localize`:@@HeroTeamAffiliation.FantasticFour:Fantastic Four`,
};
