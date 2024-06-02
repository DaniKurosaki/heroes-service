import { Gender } from "../../../../../../back/src/enums/common.enum";

export const GenderLocalized: Record<Gender, string> = {
	["male"]: $localize`:@@Gender.Male:Male`,
	["female"]: $localize`:@@Gender.Female:Female`,
};
