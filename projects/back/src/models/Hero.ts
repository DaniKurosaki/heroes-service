import mongoose from "mongoose";
import { IHero } from "../interfaces/hero.interface";
import { HeroSecretIdentityStatuses, HeroSuperpowers, HeroTeamAffiliations } from "../enums/hero.enum";
import { Genders } from "../enums/common.enum";

interface IHeroModel extends IHero, Document {}

const HeroSchema = new mongoose.Schema(
	{
		first_name: { type: String, required: true },
		last_name: { type: String, required: true },
		hero_name: { type: String, required: true },
		birth_date: { type: String, required: true },
		secret_identity: { type: String, enum: Object.values(HeroSecretIdentityStatuses), required: true },
		gender: { type: String, enum: Object.values(Genders), required: true },
		superpower: { type: String, enum: Object.values(HeroSuperpowers), required: true },
		team_affiliation: { type: String, enum: Object.values(HeroTeamAffiliations), required: true },
	},
	{
		timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
		toJSON: {
			virtuals: true,
			transform: function (_, ret) {
				// doc, ret
				delete ret._id;
				delete ret.__v;
			},
		},
		versionKey: false,
	}
);

export const Hero = mongoose.model<IHeroModel>("Hero", HeroSchema, "Heroes");
