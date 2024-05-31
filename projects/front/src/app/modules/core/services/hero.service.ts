import { Injectable, inject } from "@angular/core";
import { Observable } from "rxjs";
import { IHero } from "../../../../../../back/src/interfaces/hero.interface";
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
	providedIn: "root",
})
export class HeroService {
	protected readonly http: HttpClient = inject(HttpClient);

	private readonly urlToEndpoint = environment.apiUrl + ":" + environment.apiPort + environment.apiPath + "/heroes";

	public getAll(): Observable<IHero[]> {
		return this.http.get<IHero[]>(this.urlToEndpoint);
	}

	public getById(id: string): Observable<IHero> {
		return this.http.get<IHero>(`${this.urlToEndpoint}/${id}`);
	}

	public create(data: IHero): Observable<IHero> {
		return this.http.post<IHero>(this.urlToEndpoint, data);
	}

	public update(id: string, data: IHero): Observable<IHero> {
		return this.http.put<IHero>(`${this.urlToEndpoint}/${id}`, data);
	}

	public deleteById(id: string): Observable<IHero> {
		return this.http.delete<IHero>(`${this.urlToEndpoint}/${id}`);
	}
}
