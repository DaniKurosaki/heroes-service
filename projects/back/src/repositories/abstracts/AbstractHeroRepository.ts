import { IHero } from "../../interfaces/hero.interface";

export interface AbstractHeroRepository {
    create(hero: IHero): Promise<IHero>;
    findAll(): Promise<IHero[]>;
    findById(id: string): Promise<IHero | null>;
    update(id: string, hero: IHero): Promise<IHero | null>;
    delete(id: string): Promise<IHero | null>;
    // other CRUD operations...
}
