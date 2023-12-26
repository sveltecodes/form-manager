import type { FormValidator } from "../form-validator";

export const formEmailValidator: FormValidator = {
	fn: (value: string) => value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).length > 0,
	message: "Invalid email address"
};
