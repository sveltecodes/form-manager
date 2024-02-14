<script lang="ts">
	import { setContext } from "svelte";
	import { type Form } from "./form";

	export let form: Form;
	export let classes: string;
	export let onSubmit: (event: Event) => unknown

	setContext(form.name, form);

	</script>

<form on:submit={onSubmit} class={classes}>
	<slot {form} />
</form>
