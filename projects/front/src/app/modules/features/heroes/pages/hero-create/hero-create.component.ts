import { Component } from "@angular/core";
import { HeroFormComponent } from "../../components/hero-form/hero-form.component";

/**
 * This page serves as the creation page for a hero in the application.
 */
@Component({
	selector: "hero-create",
	standalone: true,
	imports: [HeroFormComponent],
	templateUrl: "./hero-create.component.html",
	styleUrl: "./hero-create.component.scss",
})
export class HeroCreateComponent {
	/**
	 * Text for the accept button of the form
	 */
	public acceptText: string = "Add";
}
