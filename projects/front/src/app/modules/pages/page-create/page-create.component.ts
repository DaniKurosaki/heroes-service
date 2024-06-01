import { Component } from "@angular/core";
import { FormHeroComponent } from "../../core/components/form-hero/form-hero.component";

/**
 * This page serves as the creation page for a hero in the application.
 */
@Component({
	selector: "page-create",
	standalone: true,
	imports: [FormHeroComponent],
	templateUrl: "./page-create.component.html",
	styleUrl: "./page-create.component.scss",
})
export class PageCreateComponent {
	/**
	 * Text for the accept button of the form
	 */
	public acceptText: string = "Add";
}
