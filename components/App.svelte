<script lang="ts">
  import UIButtonCopy from './UIButtonCopy.svelte';
  import { savePlace } from './savePlace';

  let loading = false;
  let mapURLs: string[] = [];

  function onFileSelect(event) {
    loading = true;
    const data = event.target.files[0];
    const reader = new FileReader();

    reader.readAsText(data);
    reader.onload = (e) => {
      const json = JSON.parse(e.target.result);
      const rawURLs = json.features.map((f) => f.properties['Google Maps URL']);
      // Wrap each URL in quotes to create valid JavaScript for the clipboard
      mapURLs = rawURLs.map((url) => `'${url}'`);
      loading = false;
    };
  }

  $: copyText = `
    mapURLs=[${mapURLs}];
    ${savePlace}
    mapURLs.forEach(savePlace);
  `.trim();
</script>

<input type="file" accept=".json" on:change={onFileSelect} />
<UIButtonCopy {copyText}>Copy code</UIButtonCopy>
<!-- prettier-ignore -->
<pre class="max-h-screen overflow-y-auto p-5 text-xs bg-gray-200"><code>
{#if mapURLs.length}
// These are the URLs you've uploaded from Google Takeout
mapURLs = [
  {@html mapURLs.join(',<br/>  ')}
];

{/if}// This function opens a new window with the URL, waits for the page to load
// then watches for the buttons to appear on the screen. When the save place
// button is present, it clicks it, then clicked the starred places list
{savePlace}

// This function loops through all the URLs and opens them in a new tab
mapURLs.forEach(savePlace);
</code></pre>

<style>
  pre:first-line {
    line-height: 0;
  }
</style>
