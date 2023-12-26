import type { ReplaySubject } from "rxjs";
import type { FormValidator } from "./form-validator";

export class FormField<T> {
	public name: string;
	public label?: string;
	public placeholder?: string;
	public value?: ReplaySubject<T>;
	public touched?: boolean;
	public control?: HTMLInputElement;
	public validators?: FormValidator[];
	public errors?: ReplaySubject<string[]>;
}
