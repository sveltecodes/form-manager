import type { FormValidator } from "../form-validator";

// export const formMinValidator: FormValidator<any> = {
// 	fn: (value: string) => (value ? value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)?.length > 0 : false),
// 	message: "Invalid email address"
// };

export const mustEqual = (v: any): FormValidator<any> => {
	return {
		fn: (value: string) => (value == v),
		message: `values must match`
	};
};