import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NavbarRoutesLocalized, RouteEnum } from "../../constants/routes";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";

@Component({
	selector: "navbar",
	standalone: true,
	imports: [CommonModule, RouterModule, MatButtonModule, MatToolbarModule],
	templateUrl: "./navbar.component.html",
	styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent {
	public tabs = NavbarRoutesLocalized;

	/**
	 * Reference to the RouteEnum
	 */
	protected readonly RouteEnum = RouteEnum;
}
