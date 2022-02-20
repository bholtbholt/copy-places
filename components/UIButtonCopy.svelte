<script>
  export let copyText = window.location.href;
  let copiedSuccessfully = false;
  let className = '';
  export { className as class };

  async function share() {
    await navigator.clipboard.writeText(copyText);

    copiedSuccessfully = true;
    setTimeout(() => {
      copiedSuccessfully = false;
    }, 1000);
  }
</script>

<button
  type="button"
  on:click={share}
  class="{className} block px-12 py-2
    rounded-full text-center whitespace-nowrap
    text-xl text-black
    bg-amber-400 hover:bg-amber-300 focus:bg-amber-300
    ease-out duration-500 transition-colors"
>
  {#if copiedSuccessfully}
    Copied!
  {:else}
    <slot>Copy text</slot>
  {/if}
</button>
