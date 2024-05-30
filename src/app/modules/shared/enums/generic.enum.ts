export enum GenderEnum {
	MALE = "male",
	FEMALE = "female",
}

export type Genders = Lowercase<keyof typeof GenderEnum>;

export const GenderLocalized: Record<Genders, string> = {
	[GenderEnum.MALE]: "Male",
	[GenderEnum.FEMALE]: "Female",
};
