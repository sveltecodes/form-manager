import { BehaviorSubject } from "rxjs";
import type { FormValidator } from "./form-validator";
import { type SelectProps } from "bits-ui";
import type { SelectOption } from "./types";

export class FormField<T> {
	public name: string;
	public label?: string;
	public placeholder?: string;
	public value?: BehaviorSubject<T>;
	public touched?: boolean;
	public control?: HTMLInputElement | SelectProps<SelectOption>;
	public validators?: FormValidator<T>[] = [];
	public errors? = new BehaviorSubject<string[]>([]);
	public valid? = new BehaviorSubject<boolean>(false);

	public constructor(field: FormField<T>) {
		Object.assign(this, field);
		this.value = new BehaviorSubject<T>((field.value as any) || null);
	}

	public register?(control: HTMLInputElement | SelectProps<SelectOption>): void {
		if (!(control instanceof HTMLInputElement)) {
			return;
		}
		this.control = control;
		this.control.addEventListener("change", (v) => {
			const value = (v.target as HTMLInputElement).value;
			this.value.next(value as T); // Add type assertion
			if (this.validate(value)) {
				// this.value.next(this.control.value as any);
			}
		});
	}

	public validate(value: string): boolean {
		if (!this.validators) {
			this.errors.next([]);
			this.valid.next(true);
		}

		const errors: string[] = [];

		for (const validator of this.validators) {
			const error = validator.fn(value as any);
			if (!error) {
				errors.push(validator.message);
			}
		}

		this.errors.next(errors);

		if (errors.length > 0) {
			this.valid.next(false);
			return true;
		} else {
			this.valid.next(true);
		}
	}
}
