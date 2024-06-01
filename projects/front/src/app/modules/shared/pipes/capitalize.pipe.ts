import { Pipe, PipeTransform } from "@angular/core";

/**
 * This pipe capitalizes the first letter of a string.
 */
@Pipe({
	name: "capitalize",
	pure: true,
	standalone: true,
})
export class CapitalizePipe implements PipeTransform {
	/**
	 * Capitalizes the first letter of a string.
	 * @param value The string to capitalize.
	 * @returns The string with the first letter capitalized.
	 */
	transform(value: string): string {
		return value.charAt(0).toUpperCase() + value.slice(1);
	}
}
