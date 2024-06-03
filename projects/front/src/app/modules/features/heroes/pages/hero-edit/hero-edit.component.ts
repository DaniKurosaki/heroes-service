import { Component } from "@angular/core";
import { HeroFormComponent } from "../../components/hero-form/hero-form.component";

/**
 * This page serves as the edition page for a hero in the application.
 */
@Component({
	selector: 'hero-edit',
	standalone: true,
	imports: [HeroFormComponent],
	templateUrl: './hero-edit.component.html',
	styleUrl: './hero-edit.component.scss',
})
export class HeroEditComponent {}
