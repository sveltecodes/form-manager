<script lang="ts">
  export let title: string;
  export let subtitle: string = "";
</script>

<div class="flex flex-col">
  <div class="text-sm font-medium text-muted-foreground">
    {title}
  </div>
  {#if subtitle.length > 0}
    <div class="text-sm text-muted-foreground/50">
      {subtitle}
    </div>
  {/if}
</div>
