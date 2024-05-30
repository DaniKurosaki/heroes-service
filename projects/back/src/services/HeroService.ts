import { IHero } from "../interfaces/hero.interface";
import { HeroRepository } from "../repositories/HeroRepository";
import { AbstractHeroRepository } from "../repositories/abstracts/AbstractHeroRepository";

export class HeroService {
    private static instance: HeroService;

    private heroRepository: AbstractHeroRepository = HeroRepository.getInstance();

    private constructor() {}

    public static getInstance(): HeroService {
        if (!HeroService.instance) {
            HeroService.instance = new HeroService();
        }
        return HeroService.instance;
    }

    public createHero(heroData: IHero) {
        return this.heroRepository.create(heroData);
    }

    public async getAll() {
        return this.heroRepository.findAll();
    }

    public async getOneById(id: string) {
        return this.heroRepository.findById(id);
    }

    public async update(id: string, heroData: IHero) {
        return this.heroRepository.update(id, heroData);
    }

    public async delete(id: string) {
        return this.heroRepository.delete(id);
    }

    // other methods...
}
