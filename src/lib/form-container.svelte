<script lang="ts">
	import { setContext } from "svelte";
	import { type Form } from "./form";

	export let form: Form;
	export let classes: string;

	setContext(form.name, form);

	const onSubmit = (e: Event) => {
		e.preventDefault();
		form.submit();
	};
</script>

<form on:submit={onSubmit} class={classes}>
	<slot {form} />
</form>
