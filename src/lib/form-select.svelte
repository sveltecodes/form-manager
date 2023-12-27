<script lang="ts">
	import { Select } from "bits-ui";
	import type { Form } from "./form";
	import { getContext, onMount } from "svelte";
	import type { FormContextType } from ".";

	export let options: { label: string; value: string }[];
	export let name: string;
	export let form: Form;
	export let value: string = "";
	export let placeholder: string = "";
	export let classes: string = "";

	let control: HTMLSelectElement;
	const ctx = getContext<FormContextType<any>>(form.name);

	onMount(() => {
		ctx.register(name, control);
	});
</script>

<Select.Root>
	<Select.Trigger>
		<Select.Value {placeholder} aria-label={placeholder} />
	</Select.Trigger>
	<Select.Content>
		{#each options as option}
			<Select.Item value={option.value}>
				{option.label}
			</Select.Item>
		{/each}
	</Select.Content>
</Select.Root>
