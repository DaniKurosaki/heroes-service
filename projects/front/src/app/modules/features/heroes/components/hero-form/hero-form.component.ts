import { CommonModule } from "@angular/common";
import { Component, Input, inject, isDevMode } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";

import { CommonComponent } from "../../../../core/components/common/common.component";

import { HeroService } from "../../services/hero.service";
import { HeroSubRouteEnum, RouteEnum } from "../../../../core/constants/routes";
import { GenderLocalized } from "../../../../shared/enums/common.enum";
import { Gender } from "../../../../../../../../back/src/enums/common.enum";
import { HeroSecretIdentityStatus, HeroSuperpower, HeroTeamAffiliation } from "../../../../../../../../back/src/enums/hero.enum";
import { HeroKeysLocalized, HeroSecretIdentityStatusLocalized, HeroSuperpowerLocalized, HeroTeamAffiliationLocalized } from "../../enums/hero.enum";
import { ModelFormGroup, Toast } from "../../../../shared/interfaces/common.interface";
import { IHeroCreate } from "../../../../../../../../back/src/interfaces/hero.interface";

import { mapKeysToArray } from "../../../../shared/utils/mappers.util";
import { ToastComponent } from "../../../../core/components/toast/toast.component";

/**
 * Variant for the component
 */
type Variant = "create" | "update";

/**
 * Select fields for the Hero
 */
const SelectFields = ["secret_identity", "gender", "superpower", "team_affiliation"] as const;

/**
 * Type for the select fields
 */
type SelectField = (typeof SelectFields)[number];

/**
 * Icons for the Hero keys
 */
const HeroKeysIcons: Record<keyof IHeroCreate, string> = {
	["first_name"]: "person",
	["last_name"]: "person",
	["hero_name"]: "badge",
	["secret_identity"]: "no_accounts",
	["gender"]: "wc",
	["birth_date"]: "celebration",
	["superpower"]: "bolt",
	["team_affiliation"]: "groups",
};

/**
 * Localized text keys for this component messages
 */
type Messages = "FIELDS_ERROR" | "CREATED" | "UPDATED";

/**
 * Localized texts for this component messages
 */
const MessagesLocalized: Record<Messages, string> = {
	["FIELDS_ERROR"]: $localize`:@@HeroForm.FieldsError:Please fill in all required fields`,
	["CREATED"]: $localize`:@@HeroForm.Created: created successfully`,
	["UPDATED"]: $localize`:@@HeroForm.Updated: updated successfully`,
};

/**
 * This component is a form for the Hero model
 */
@Component({
	selector: "hero-form",
	standalone: true,
	imports: [CommonModule, RouterModule, ReactiveFormsModule, MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule],
	templateUrl: "./hero-form.component.html",
	styleUrl: "./hero-form.component.scss",
})
export class HeroFormComponent extends CommonComponent {
	/**
	 * Injected dependency for Router
	 */
	protected readonly router: Router = inject(Router);

	/**
	 * Injected dependency for Form Builder
	 */
	protected readonly fb: FormBuilder = inject(FormBuilder);

	/**
	 * Injected dependency for the ActivatedRoute
	 */
	protected readonly route: ActivatedRoute = inject(ActivatedRoute);

	/**
	 * Injected dependency for Hero Service
	 */
	protected readonly heroService: HeroService = inject(HeroService);

	/**
	 * Variant for the form
	 */
	@Input({ required: true }) public variant!: Variant;

	/**
	 * Text for the accept button
	 */
	@Input() public acceptText: string = "Save";

	/**
	 * Text for the reset button
	 */
	@Input() public resetText: string = "Reset";

	/**
	 * Text for the cancel button
	 */
	@Input() public cancelText: string = "Cancel";

	/**
	 * Form group for the Hero
	 */
	public form: ModelFormGroup<IHeroCreate> = this.initForm();

	/**
	 * Hero's ID
	 */
	public id: string | null = this.route.snapshot.params["id"] ?? null;

	/**
	 * Keys for the Hero
	 */
	public readonly fields: (keyof IHeroCreate)[] = mapKeysToArray(HeroKeysLocalized, "id");

	/**
	 * Options for every select field
	 */
	public readonly selectsOptions: Record<SelectField, Record<string, string>> = {
		["secret_identity"]: HeroSecretIdentityStatusLocalized,
		["gender"]: GenderLocalized,
		["superpower"]: HeroSuperpowerLocalized,
		["team_affiliation"]: HeroTeamAffiliationLocalized,
	};

	/**
	 * Localized texts for the Hero keys
	 */
	protected readonly HeroKeysLocalized = HeroKeysLocalized;

	/**
	 * Icons for the Hero keys
	 */
	protected readonly HeroKeysIcons = HeroKeysIcons;

	/**
	 * Reference to the RouteEnum
	 */
	protected readonly RouteEnum = RouteEnum;

	/**
	 * Loads the Hero if the variant is "update"
	 */
	override load(): void {
		if (this.variant === "create" || !this.id) return;

		this.subscriptions.push(
			this.heroService.getById(this.id).subscribe((hero) => {
				this.form.patchValue(hero);
			})
		);
	}

	/**
	 * Initializes the form
	 */
	private initForm(): ModelFormGroup<IHeroCreate> {
		return this.fb.nonNullable.group({
			first_name: this.fb.nonNullable.control("", Validators.required),
			last_name: this.fb.nonNullable.control("", Validators.required),
			hero_name: this.fb.nonNullable.control("", Validators.required),
			birth_date: this.fb.nonNullable.control("", Validators.required),
			secret_identity: this.fb.nonNullable.control<HeroSecretIdentityStatus>("public", Validators.required),
			gender: this.fb.nonNullable.control<Gender>("male", Validators.required),
			superpower: this.fb.nonNullable.control<HeroSuperpower>("flight", Validators.required),
			team_affiliation: this.fb.nonNullable.control<HeroTeamAffiliation>("avengers", Validators.required),
		});
	}

	/**
	 * Type guard that checks if a field is a select field
	 * @param field Field to check
	 * @returns Whether the field is a select field
	 */
	protected isSelectField(field: keyof IHeroCreate): field is SelectField {
		return SelectFields.findIndex((selectField) => selectField === field) !== -1;
	}

	/**
	 * Resets the form
	 */
	public resetForm(): void {
		this.form.reset();
		this.form.markAsPristine();
		this.form.markAsUntouched();
	}

	/**
	 * Submits the form
	 */
	public submitForm(): void {
		this.form.markAllAsTouched();
		if (!this.form.valid) {
			this.toastService.openFromComponent<ToastComponent, Toast>(ToastComponent, {
				duration: 2500,
				data: {
					title: `${MessagesLocalized["FIELDS_ERROR"]}`,
					type: "error",
				},
			});
			return;
		}

		this[this.variant]();
	}

	/**
	 * Creates a new Hero
	 */
	private create(): void {
		this.subscriptions.push(
			this.heroService.create(this.form.getRawValue()).subscribe({
				next: (hero) => {
					this.router.navigate([RouteEnum.HEROES, HeroSubRouteEnum.LIST]);

					this.toastService.openFromComponent<ToastComponent, Toast>(ToastComponent, {
						duration: 2500,
						data: {
							title: `${hero.hero_name} ${MessagesLocalized["CREATED"]}`,
							type: "success",
						},
					});
				},
				error: (error) => {
					if (isDevMode()) console.error(error);

					this.toastService.openFromComponent<ToastComponent, Toast>(ToastComponent, {
						duration: 2500,
						data: { type: "error" },
					});
				},
			})
		);
	}

	/**
	 * Updates the Hero
	 */
	private update(): void {
		if (!this.id) return;

		this.subscriptions.push(
			this.heroService.update(this.id, this.form.value).subscribe({
				next: (hero) => {
					this.router.navigate([RouteEnum.HEROES, HeroSubRouteEnum.LIST]);

					this.toastService.openFromComponent<ToastComponent, Toast>(ToastComponent, {
						duration: 2500,
						data: {
							title: `${hero.hero_name} ${MessagesLocalized["UPDATED"]}`,
							type: "success",
						},
					});
				},
				error: (error) => {
					if (isDevMode()) console.error(error);

					this.toastService.openFromComponent<ToastComponent, Toast>(ToastComponent, {
						duration: 2500,
						data: { type: "error" },
					});
				},
			})
		);
	}
}
