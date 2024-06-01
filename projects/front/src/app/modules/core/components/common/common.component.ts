import { ChangeDetectorRef, Directive, OnDestroy, OnInit, inject } from "@angular/core";
import { Subscription } from "rxjs";
import { ILoad } from "../../../shared/interfaces/common.interface";
import { ToastService } from "../../services/toast.service";

/**
 * Generic component, which implements ILoad, OnInit, OnDestroy.
 * This way all components can extend this class if they want to use subscriptions,
 * and lifecycle hooks and/or a generic way to load/unload the component.
 */
@Directive()
export abstract class CommonComponent implements ILoad, OnInit, OnDestroy {
	public readonly toastService: ToastService = inject(ToastService);

	/**
	 * Array of subscriptions, where all subscriptions will be stored, so they can be unsubscribed on component destroy.
	 */
	public subscriptions: Subscription[] = [];

	/**
	 * On component init.
	 */
	ngOnInit(): void {
		this.load();
	}

	/**
	 * Load the component.
	 */
	load(): void {}

	/**
	 * On component destroy.
	 */
	ngOnDestroy(): void {
		this.unload();
		this.subscriptions.forEach((sub) => sub.unsubscribe());
	}

	/**
	 * Unload the component.
	 */
	unload(): void {}
}
