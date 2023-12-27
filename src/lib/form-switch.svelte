<script lang="ts">
	import { Switch, Label, type SwitchProps } from "bits-ui";
	import type { Form, FormContextType } from ".";
	import { getContext, onMount } from "svelte";
	export { className as class };
	export { selectOptions as options };

	interface $$Props extends SwitchProps {
		name: string;
		manager: Form;
	}
	export let name: $$Props["name"];
	export let manager: $$Props["manager"];
	export let placeholder: string = "";

	let control: SwitchProps;
	const ctx = getContext<FormContextType<any>>(manager.name);

	onMount(() => {
		ctx.register(name, control);
	});

	let checked: boolean;
	$: {
		manager.fields[name].value.next(checked);
	}
</script>

<Switch.Root
	class="peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
	bind:checked
>
	<Switch.Thumb class="pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"></Switch.Thumb>
</Switch.Root>
<Label.Root class="text-sm font-medium">
	{placeholder}
</Label.Root>
