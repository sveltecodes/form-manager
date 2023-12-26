import type { ReplaySubject } from "rxjs";
import type { FormValidator } from "./form-validator";

export class FormField {
	public name: string;
	public label?: string;
	public placeholder?: string;
	public type?: string;
	public value?: ReplaySubject<string>;
	public touched?: boolean;
	public control?: HTMLInputElement;
	public validators?: FormValidator[];
	public errors?: ReplaySubject<string[]>;
}
