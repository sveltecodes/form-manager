import type { FormValidator } from "../form-validator";

export const email: FormValidator<any> = {
	fn: (value: string) => (value ? value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)?.length > 0 : false),
	message: "Invalid email address"
};
