import { Gender } from "../../../../../../back/src/enums/common.enum";
import { Locales } from "../interfaces/common.interface";

/**
 * Locales available
 */
export const LOCALES = ["en", "es"] as const;

/**
 * Locales localized
 */
export const LocalesList: Record<Locales, string> = {
	["en"]: $localize`:@@Locales.English:English`,
	["es"]: $localize`:@@Locales.Spanish:Spanish`,
};

/**
 * Gender localized
 */
export const GenderLocalized: Record<Gender, string> = {
	["male"]: $localize`:@@Gender.Male:Male`,
	["female"]: $localize`:@@Gender.Female:Female`,
};
