<script lang="ts">
  import { getContext, onMount } from "svelte";
  import type { Form } from "./form";
  import type { FormContextType } from "./form-context";

  export let name: string;
  export let form: Form;
  export let value: string = "";
  export let placeholder: string = "";
  export let classes: string = "";

  let control: HTMLInputElement;

  const ctx = getContext<FormContextType>(form.name);

  onMount(() => {
    ctx.register({
      name,
      control,
      placeholder
    });
    console.log(form.fields[name]);
  });

  const onChange = (e) => {
    form.fields[name].value.next(e.target.value);
  };
</script>

<input bind:this={control} bind:value {name} on:change={onChange} {...$$restProps} {placeholder} class="h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-foreground file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 {classes}" />
<!-- <Errors {errors} /> -->
