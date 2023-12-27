import type { FormValidator } from "../form-validator";

// export const formMinValidator: FormValidator<any> = {
// 	fn: (value: string) => (value ? value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)?.length > 0 : false),
// 	message: "Invalid email address"
// };

export const maxLength = (length: number): FormValidator<any> => {
	return {
		fn: (value: string) => (value ? value.length <= length : true),
		message: `must be at most ${length} characters`
	};
};
