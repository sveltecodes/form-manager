import type { BehaviorSubject, ReplaySubject } from "rxjs";
import type { FormValidator } from "./form-validator";

export class FormField<T> {
	public name: string;
	public label?: string;
	public placeholder?: string;
	public value?: BehaviorSubject<T>;
	public touched?: boolean;
	public control?: HTMLInputElement;
	public validators?: FormValidator[];
	public errors?: ReplaySubject<string[]>;
}
