import { Component } from "@angular/core";
import { HeroFormComponent } from "../../components/hero-form/hero-form.component";

@Component({
	selector: 'hero-edit',
	standalone: true,
	imports: [HeroFormComponent],
	templateUrl: './hero-edit.component.html',
	styleUrl: './hero-edit.component.scss',
})
export class HeroEditComponent {}
