import { Component } from "@angular/core";
import { FormHeroComponent } from "../../core/components/form-hero/form-hero.component";

@Component({
	selector: "page-edit",
	standalone: true,
	imports: [FormHeroComponent],
	templateUrl: "./page-edit.component.html",
	styleUrl: "./page-edit.component.scss",
})
export class PageEditComponent {}
