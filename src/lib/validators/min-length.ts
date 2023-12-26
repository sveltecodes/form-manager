import type { FormValidator } from "../form-validator";

// export const formMinValidator: FormValidator<any> = {
// 	fn: (value: string) => (value ? value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)?.length > 0 : false),
// 	message: "Invalid email address"
// };

export const minLength = (length: number): FormValidator<any> => {
	return {
		fn: (value: string) => (value ? value.length >= length : false),
		message: `Must be at least ${length} characters`
	};
};
