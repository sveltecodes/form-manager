import type { FormField } from ".";

export class FormConfig {
	public name: string;
	public fields: { [name: string]: FormField<unknown> };
}
