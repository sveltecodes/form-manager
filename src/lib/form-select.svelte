<script lang="ts">
	import { Select, type SelectProps, type Selected } from "bits-ui";
	import { getContext, onMount } from "svelte";
	import type { HTMLSelectAttributes } from "svelte/elements";
	import type { FormContextType } from ".";
	import { Form } from "./form";
	import type { SelectOption } from "./types";
	import { writable } from "svelte/store";

	let selectOptions: SelectOption[];
	export { className as class };
	export { selectOptions as options };

	interface $$Props extends HTMLSelectAttributes {
		name: string;
		manager: Form;
		options: SelectOption[];
	}
	export let name: $$Props["name"];
	export let manager: $$Props["manager"];
	export let placeholder: string = "";

	let control: SelectProps<SelectOption>;
	const ctx = getContext<FormContextType<any>>(manager.name);

	onMount(() => {
		ctx.register(name, control);
	});

	let bindedValue: Selected<SelectOption>;

	const validateSelect = (value: unknown) => {
		if (!manager.fields[name].validators) {
			manager.fields[name].errors.next([]);
			manager.fields[name].valid.next(true);
		}
		const errors: string[] = [];

		for (const validator of manager.fields[name].validators) {
			const error = validator.fn(value as any);
			if (!error) {
				errors.push(validator.message);
			}
		}

		manager.fields[name].errors.next(errors);

		if (errors.length > 0) {
			manager.fields[name].valid.next(false);
			return true;
		} else {
			manager.fields[name].valid.next(true);
		}
	};

	$: {
		if (bindedValue) {
			manager.fields[name].value.next(bindedValue.value);
			if (validateSelect(bindedValue.value)) {
			}
		}
	}
</script>

<Select.Root
	loop
	bind:selected={bindedValue}
	onOpenChange={() => {
		console.log("what");
	}}
>
	<Select.Trigger
		class="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
	>
		<Select.Value {placeholder} aria-label={placeholder} />
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6" /></svg>
	</Select.Trigger>

	<Select.Content
		strategy="fixed"
		class="max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
	>
		{#each selectOptions as option}
			<Select.Item class="flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50" value={option.value}>
				{option.label}
			</Select.Item>
		{/each}
	</Select.Content>
</Select.Root>
