import type { FormValidator } from "./form-validator";

export const minLength = (length: number): FormValidator<any> => {
	return {
		fn: (value: string) => (value ? value.length >= length : false),
		message: `Must be at least ${length} characters`
	};
};
