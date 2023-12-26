import { ReplaySubject, Subject, Subscription, combineLatest } from "rxjs";
import type { FormConfig } from "./form-config";
import type { FormError } from "./form-error";
import type { FormField } from "./form-field";

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
	}

	public register?<T>(field: FormField<T>): void {
		if (typeof field.value === "string") {
			field.value = new ReplaySubject<T>(1);
			field.value.next(field.value as any);
		} else {
			field.value = new ReplaySubject<T>(1);
		}
		this.fields[field.name] = field;
	}

	public submit(): KV {
		const values: KV = {};
		const subject = new Subject<KV>();
		combineLatest(Object.values(this.fields).map((field) => field.value)).subscribe((v) => {
			for (let i = 0; i < v.length; i++) {
				values[Object.values(this.fields)[i].name] = v[i];
			}
			subject.next(values);
		});
		return values;
	}
}
