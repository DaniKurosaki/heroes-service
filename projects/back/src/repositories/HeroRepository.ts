import { IHero } from "../interfaces/hero.interface";
import { Hero } from "../models/Hero";
import { AbstractHeroRepository } from "./abstracts/AbstractHeroRepository";

export class HeroRepository implements AbstractHeroRepository {
	private static instance: HeroRepository;

	private constructor() {}

	public static getInstance(): HeroRepository {
		if (!HeroRepository.instance) {
			HeroRepository.instance = new HeroRepository();
		}
		return HeroRepository.instance;
	}

	public async create(heroData: IHero): Promise<IHero> {
		const hero = new Hero(heroData);
		return await hero.save();
	}

	public async findAll(): Promise<IHero[]> {
		return await Hero.find().exec();
	}

	public async findById(id: string): Promise<IHero | null> {
		return await Hero.findById(id).exec();
	}

	public async update(id: string, heroData: IHero): Promise<IHero | null> {
		return await Hero.findByIdAndUpdate(id, heroData, { new: true }).exec();
	}

	public async delete(id: string): Promise<IHero | null> {
		return await Hero.findByIdAndDelete(id).exec();
	}
}
