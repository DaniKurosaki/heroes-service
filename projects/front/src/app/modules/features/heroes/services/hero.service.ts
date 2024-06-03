import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { environment } from "../../../../../environments/environment";
import { IHero, IHeroCreate } from "../../../../../../../back/src/interfaces/hero.interface";

/**
 * This service manages connections to the Hero section of the API
 */
@Injectable({
	providedIn: "root",
})
export class HeroService {
	/**
	 * Injected dependency for HTTP Client
	 */
	protected readonly http: HttpClient = inject(HttpClient);

	/**
	 * URL to the Hero endpoint
	 */
	private readonly urlToEndpoint = `${environment.apiUrl}${environment.apiPort ? ":" + environment.apiPort : ""}${environment.apiPath}/heroes`;

	/**
	 * Get all Heroes
	 */
	public getAll(): Observable<IHero[]> {
		return this.http.get<IHero[]>(this.urlToEndpoint);
	}

	/**
	 * Get a Hero by its ID
	 * @param id Hero's ID
	 */
	public getById(id: string): Observable<IHero> {
		return this.http.get<IHero>(`${this.urlToEndpoint}/${id}`);
	}

	/**
	 * Create a Hero
	 * @param data Hero's data
	 */
	public create(data: IHeroCreate): Observable<IHero> {
		return this.http.post<IHero>(this.urlToEndpoint, data);
	}

	/**
	 * Update a Hero by its ID
	 * @param id Hero's ID
	 * @param data Hero's data
	 */
	public update(id: string, data: Partial<IHeroCreate>): Observable<IHero> {
		return this.http.put<IHero>(`${this.urlToEndpoint}/${id}`, data);
	}

	/**
	 * Delete a Hero by its ID
	 * @param id Hero's ID
	 */
	public deleteById(id: string): Observable<IHero> {
		return this.http.delete<IHero>(`${this.urlToEndpoint}/${id}`);
	}
}
