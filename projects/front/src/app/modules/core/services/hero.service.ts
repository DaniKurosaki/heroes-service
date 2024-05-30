import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { Hero } from "../../shared/interfaces/hero.interface";
import { HeroesMock } from "../../shared/mocks/hero.mock";

@Injectable({
	providedIn: "root",
})
export class HeroService {
	private heroesMock$: BehaviorSubject<Hero[]> = new BehaviorSubject<Hero[]>(HeroesMock);

	constructor() {}

	public get(): Observable<Hero[]> {
		return  this.heroesMock$.asObservable();
	}
}
