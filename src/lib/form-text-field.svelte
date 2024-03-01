<script lang="ts">
	import { getContext, onMount } from "svelte";
	import type { HTMLInputAttributes } from "svelte/elements";
	import { twMerge } from "tailwind-merge";
	import FieldError from "./field-error.svelte";
	import type { Form } from "./form";
	import type { FormContextType } from "./form-context";

	export { className as class };

	interface $$Props extends HTMLInputAttributes {
		name: string;
		manager: Form;
	}
	export let name: $$Props["name"];
	export let manager: $$Props["manager"];
	export let value: string = null;
	export let placeholder: string = "";

	let control: HTMLInputElement;

	const ctx = getContext<FormContextType<any>>(manager.name);

	onMount(() => {
		ctx.register(name, control, value);
	});

	$: errors = manager.fields[name].errors;
</script>

<input
	{...$$props}
	bind:this={control}
	bind:value
	{name}
	{placeholder}
	data-1p-ignore
	class={twMerge(
		"h-9 rounded-md border border-gray-600 bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-foreground file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
		$$props.class
	)}
/>
<FieldError {errors} />
