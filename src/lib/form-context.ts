import type { SelectProps } from "bits-ui";
import type { SelectOption } from "./types";

export type FormContextType<T> = {
	register: (name: string, control: HTMLInputElement | SelectProps<SelectOption>, value?: any) => void;
};
