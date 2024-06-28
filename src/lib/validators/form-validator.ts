export class FormValidator<T> {
	public fn: (value: T) => boolean;
	public message: string;
}
