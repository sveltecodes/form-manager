<script lang="ts">
	import { Label, Switch, type SwitchProps } from "bits-ui";
	import { getContext, onMount } from "svelte";
	import { twMerge } from "tailwind-merge";
	import type { Form, FormContextType } from ".";
	export { className as class };
	export { selectOptions as options };

	export let name: string;
	export let manager: Form;
	export let checked: boolean = false;
	export let placeholder: string = null;

	let control: SwitchProps;

	const ctx = getContext<FormContextType<any>>(manager.name);

	onMount(() => {
		ctx.register(name, control);
		manager.fields[name].value.next(checked);
	});
</script>

<Switch.Root
	class={twMerge(
		"peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-green-600 data-[state=unchecked]:bg-gray-600",
		$$props.class
	)}
	bind:checked>
	<Switch.Thumb class="pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"></Switch.Thumb>
</Switch.Root>
{#if placeholder}
	<Label.Root class="text-sm font-medium">
		{placeholder}
	</Label.Root>
{/if}
