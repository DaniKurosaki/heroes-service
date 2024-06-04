import { IHero } from "../../../../../../../../back/src/interfaces/hero.interface";

export const heroesMock: IHero[] = [
	{
		id: "1",
		first_name: "John",
		last_name: "Doe",
		hero_name: "JD",
		birth_date: "2000-01-01",
		gender: "male",
		secret_identity: "secret",
		superpower: "super-strength",
		team_affiliation: "avengers",
	},
	{
		id: "2",
		first_name: "Jane",
		last_name: "Doe",
		hero_name: "JaneDoe",
		birth_date: "2000-01-01",
		gender: "female",
		secret_identity: "public",
		superpower: "flight",
		team_affiliation: "fantastic-four",
	},
];
