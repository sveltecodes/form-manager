export type FormContextType<T> = {
	register: (name: string, control: HTMLInputElement | HTMLSelectElement) => void;
};
