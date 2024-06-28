import type { Validator } from "./validator";

export const email: Validator<any> = {
	fn: (value: string) => (value ? value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)?.length > 0 : false),
	message: "Invalid email address"
};
