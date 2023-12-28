import { BehaviorSubject, ReplaySubject, Subject, Subscription, combineLatest } from "rxjs";
import type { FormConfig } from "./form-config";
import type { FormError } from "./form-error";
import { FormField } from "./form-field";

export type KV = { [name: string]: string };

export class Form {
	public name: string;
	public fields: { [name: string]: FormField<any> } = {};
	public errors? = new BehaviorSubject<{ [name: string]: FormError }[] | null>(null);
	public submitted? = new Subject<{ [name: string]: string }>();
	public values = new ReplaySubject<KV>(1);

	private subscriptions: Subscription[] = [];

	public constructor(config: FormConfig) {
		Object.assign(this, config);
		for (const field in this.fields) {
			this.fields[field] = new FormField(this.fields[field]);
		}
	}

	public register?<T>(name: string, control: HTMLInputElement): void {
		this.fields[name].control = control;
		this.fields[name].register(control);
		this.subscriptions.push(this.fields[name].valid.subscribe((e) => { }));
		this.fields[name].value.subscribe((v) => {
			this.values.next(this.combineValues());
		});

		this.fields[name].errors.subscribe((errors) => {
			if (errors.length === 0) {
				this.errors.next(null);
				return;
			}

			for (const error of errors) {
				if (this.errors.getValue()) {
					this.errors.next(
						this.errors.getValue().concat({
							[name]: {
								message: error
							}
						})
					);
				} else {
					this.errors.next([
						{
							[name]: {
								message: error
							}
						}
					]);
				}
			}
		});
	}

	// So we don't submit each time
	private combineValues(): KV {
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
	public submit(): KV {
		const values: KV = {};
		const fields = Object.values(this.fields);
		combineLatest(fields.map((field) => field.value)).subscribe((v) => {
			for (const index in Object.values(this.fields)) {
				const isRequired = fields[index].required;
				const fieldValue = fields[index].value;

				if (isRequired && !fieldValue.getValue()) {
					const errors: string[] = [];

					fields[index].errors.next(errors.concat("Required field"));
				} else {
					values[fields[index].name] = v[index];
				}
			}
		});

		return values;
	}
}
