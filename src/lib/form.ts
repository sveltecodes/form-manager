import { ReplaySubject, Subject, Subscription, combineLatest } from "rxjs";
import type { FormConfig } from "./form-config";
import type { FormError } from "./form-error";
import { FormField } from "./form-field";

export type KV = { [name: string]: string };

export class Form {
	public name: string;
	public fields: { [name: string]: FormField<any> } = {};
	public errors?: { [name: string]: FormError } = {};
	public submitted? = new Subject<{ [name: string]: string }>();
	public values = new ReplaySubject<KV>(1);

	private subscriptions: Subscription[] = [];

	public constructor(config: FormConfig) {
		Object.assign(this, config);
		for (const field in this.fields) {
			this.fields[field] = new FormField(this.fields[field]);
		}
	}

	public register?<T>(name: string, control: HTMLInputElement | HTMLSelectElement): void {
		this.fields[name].control = control;
		this.fields[name].register(control);
		this.subscriptions.push(this.fields[name].valid.subscribe((e) => {}));
	}

	public submit(): KV {
		const values: KV = {};
		combineLatest(Object.values(this.fields).map((field) => field.value))
			.subscribe((v) => {
				for (let i = 0; i < v.length; i++) {
					values[Object.values(this.fields)[i].name] = v[i];
				}
			})
			.unsubscribe();
		return values;
	}
}
