import type { FormValidator } from "../form-validator";

export const mustEqual = (v: any): FormValidator<any> => {
	return {
		fn: (value: string) => (value == v),
		message: `values must match`
	};
};