<script lang="ts">
  export let mapURLs = [];
  const link = 'string block ml-4 hover:underline focus:underline';
</script>

{#each mapURLs as url}
  <a href={url} target="_blank" class={link}>'{url}'<span class="punctuation">,</span></a>
{/each}
