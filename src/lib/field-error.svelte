<script lang="ts">
  import type { BehaviorSubject } from "rxjs";

  export let errors: BehaviorSubject<string[]>;
</script>

<span class="text-[0.8rem] font-medium text-destructive mb-2">
  {#each $errors as error}
    {error}
  {/each}
</span>
