import type { FormValidator } from "../form-validator";

export const maxLength = (length: number): FormValidator<any> => {
	return {
		fn: (value: string) => (value ? value.length <= length : true),
		message: `must be at most ${length} characters`
	};
};
