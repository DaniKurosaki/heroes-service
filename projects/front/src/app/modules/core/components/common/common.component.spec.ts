import { CommonComponent } from "./common.component";
import { TestBed, ComponentFixture } from "@angular/core/testing";
import { ToastService } from "../../services/toast.service";
import { Subscription } from "rxjs";

import { Component } from "@angular/core";

@Component({
	selector: "app-test-component",
	template: "",
})
class TestCommonComponent extends CommonComponent {}

describe("CommonComponent", () => {
	let component: TestCommonComponent;
	let fixture: ComponentFixture<TestCommonComponent>;
	let toastService: ToastService;

	beforeEach(() => {
		const toastServiceSpy = jasmine.createSpyObj("ToastService", ["open"]);

		TestBed.configureTestingModule({
			declarations: [TestCommonComponent],
			providers: [{ provide: ToastService, useValue: toastServiceSpy }],
		}).compileComponents();

		fixture = TestBed.createComponent(TestCommonComponent);
		component = fixture.componentInstance;
		toastService = TestBed.inject(ToastService);
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should call load on init", () => {
		spyOn(component, "load");
		component.ngOnInit();
		expect(component.load).toHaveBeenCalled();
	});

	it("should call unload on destroy", () => {
		spyOn(component, "unload");
		component.ngOnDestroy();
		expect(component.unload).toHaveBeenCalled();
	});

	it("should unsubscribe from all subscriptions on destroy", () => {
		const subscription1 = new Subscription();
		const subscription2 = new Subscription();
		spyOn(subscription1, "unsubscribe");
		spyOn(subscription2, "unsubscribe");

		component.subscriptions.push(subscription1, subscription2);
		component.ngOnDestroy();

		expect(subscription1.unsubscribe).toHaveBeenCalled();
		expect(subscription2.unsubscribe).toHaveBeenCalled();
	});
});
