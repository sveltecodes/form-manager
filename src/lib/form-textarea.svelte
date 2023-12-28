<script lang="ts">
	import { getContext, onMount } from "svelte";
	import { twMerge } from "tailwind-merge";
	import type { HTMLTextareaAttributes } from "svelte/elements";
	import FieldError from "./field-error.svelte";
	import type { Form } from "./form";
	import type { FormContextType } from "./form-context";

	export { className as class };

	interface $$Props extends HTMLTextareaAttributes {
		name: string;
		manager: Form;
	}
	export let name: $$Props["name"];
	export let manager: $$Props["manager"];
	export let value: string | number | string[] = "";
	export let placeholder: string = "";

	let control: HTMLTextAreaElement;

	const ctx = getContext<FormContextType<any>>(manager.name);

	onMount(() => {
		ctx.register(name, control);
	});

	$: errors = manager.fields[name].errors;
</script>

<textarea
	{...$$props}
	bind:this={control}
	bind:value
	{name}
	{placeholder}
	class={twMerge("flex min-h-[60px] w-full rounded-md border border-gray-600 bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", $$props.class)}
/>
<FieldError {errors} />
