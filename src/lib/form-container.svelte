<script lang="ts">
	import { setContext } from "svelte";
	import { type Form } from "./form";

	export let form: Form;

	setContext(form.name, form);

	const onSubmit = (e: Event) => {
		e.preventDefault();
		form.submit();
	};
</script>

<form on:submit={onSubmit}>
	<slot {form} />
</form>
