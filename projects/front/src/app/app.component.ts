import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NavbarComponent } from "./modules/core/components/navbar/navbar.component";
import { FooterComponent } from "./modules/core/components/footer/footer.component";

/**
 * Root component of the application.
 */
@Component({
	selector: "app-root",
	standalone: true,
	imports: [RouterOutlet, NavbarComponent, FooterComponent],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.scss",
})
export class AppComponent {}
