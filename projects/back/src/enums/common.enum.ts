export enum GenderEnum {
	MALE = "male",
	FEMALE = "female",
}

export type Genders = Lowercase<keyof typeof GenderEnum>;
