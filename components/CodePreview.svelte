<script lang="ts">
  export let mapURLs: string[] = [];

  import { scale } from 'svelte/transition';
  import { savePlace } from './savePlace';
  import MapLinks from './MapLinks.svelte';
  import UIButtonCopy from './UIButtonCopy.svelte';

  // Wrap each URL in quotes to create valid JavaScript for the clipboard
  $: copyText = `
    mapURLs=[${mapURLs.map((url) => `'${url}'`)}];
    ${savePlace}
    mapURLs.forEach(savePlace);
  `.trim();
</script>

<div>
  <!-- prettier-ignore -->
  <pre class="max-h-[66vh] mb-5 rounded-lg language-js prismjs"><code>
<span class="comment">// These are the URLs you've uploaded from Google Takeout</span>
mapURLs <span class="operator">=</span> <span class="punctuation">[</span>
<MapLinks {mapURLs} />];

<span class="comment">// This function opens a new window with the URL, waits for the page to load</span>
<span class="comment">// then watches for the buttons to appear on the screen. When the save place</span>
<span class="comment">// button is present, it clicks it, then clicks the starred places list</span>
<span class="keyword">function</span> <span class="function">savePlace</span><span class="punctuation">(</span><span class="parameter">link</span><span class="punctuation">)</span> <span class="punctuation">&#123;</span>
  <span class="keyword">const</span> scripts <span class="operator">=</span> <span class="string">`</span>
    <span class="comment">// Watches for changes on the new tab</span>
    observer <span class="operator">=</span> <span class="keyword">new</span> <span class="class-name">MutationObserver</span><span class="punctuation">(</span><span class="punctuation">(</span><span class="parameter">mutations<span class="punctuation">,</span> me</span><span class="punctuation">)</span> <span class="operator">=&gt;</span> <span class="punctuation">&#123;</span>
      <span class="comment">// Defines the save button and starred places button</span>
      <span class="keyword">const</span> saveButton <span class="operator">=</span> document<span class="punctuation">.</span><span class="function">querySelector</span><span class="punctuation">(</span><span class="string">'button[data-value="Save"]'</span><span class="punctuation">)</span><span class="punctuation">;</span>
      <span class="keyword">const</span> starredPlacesLI <span class="operator">=</span> document<span class="punctuation">.</span><span class="function">querySelector</span><span class="punctuation">(</span><span class="string">'ul[aria-label="Save in your lists"] li:nth-last-of-type(2)'</span><span class="punctuation">)</span><span class="punctuation">;</span>

      <span class="comment">// Look for the save button, then click on it when it's found</span>
      <span class="keyword">if</span> <span class="punctuation">(</span>saveButton<span class="punctuation">)</span> <span class="punctuation">&#123;</span>
        console<span class="punctuation">.</span><span class="function">log</span><span class="punctuation">(</span><span class="string">'[Copy Places]: Found save button'</span><span class="punctuation">)</span><span class="punctuation">;</span>
        saveButton<span class="punctuation">.</span><span class="function">click</span><span class="punctuation">(</span><span class="punctuation">)</span><span class="punctuation">;</span>
      <span class="punctuation">&#125;</span> <span class="keyword">else</span> <span class="punctuation">&#123;</span>
        console<span class="punctuation">.</span><span class="function">log</span><span class="punctuation">(</span><span class="string">'[Copy Places]: Looking for save button'</span><span class="punctuation">)</span><span class="punctuation">;</span>
      <span class="punctuation">&#125;</span>

      <span class="comment">// Wait for the dropdown menu to open, then click on Starred Places</span>
      <span class="keyword">if</span> <span class="punctuation">(</span>starredPlacesLI<span class="punctuation">)</span> <span class="punctuation">&#123;</span>
        console<span class="punctuation">.</span><span class="function">log</span><span class="punctuation">(</span><span class="string">'[Copy Places]: Found starred places button'</span><span class="punctuation">)</span><span class="punctuation">;</span>
        starredPlacesLI<span class="punctuation">.</span><span class="function">click</span><span class="punctuation">(</span><span class="punctuation">)</span><span class="punctuation">;</span>
        console<span class="punctuation">.</span><span class="function">log</span><span class="punctuation">(</span><span class="string">'[Copy Places]: Saved location!'</span><span class="punctuation">)</span><span class="punctuation">;</span>

        <span class="comment">// Stop watching the page</span>
        me<span class="punctuation">.</span><span class="function">disconnect</span><span class="punctuation">(</span><span class="punctuation">)</span><span class="punctuation">;</span>
        <span class="keyword">return</span><span class="punctuation">;</span>
      <span class="punctuation">&#125;</span> <span class="keyword">else</span> <span class="punctuation">&#123;</span>
        console<span class="punctuation">.</span><span class="function">log</span><span class="punctuation">(</span><span class="string">'[Copy Places]: Looking for starred places button'</span><span class="punctuation">)</span><span class="punctuation">;</span>
      <span class="punctuation">&#125;</span>
    <span class="punctuation">&#125;</span><span class="punctuation">)</span><span class="punctuation">;</span>

    observer<span class="punctuation">.</span><span class="function">observe</span><span class="punctuation">(</span>document<span class="punctuation">,</span> <span class="punctuation">&#123;</span> <span class="literal-property property">childList</span><span class="operator">:</span> <span class="boolean">true</span><span class="punctuation">,</span> <span class="literal-property property">subtree</span><span class="operator">:</span> <span class="boolean">true</span> <span class="punctuation">&#125;</span><span class="punctuation">)</span><span class="punctuation">;</span>
    console<span class="punctuation">.</span><span class="function">log</span><span class="punctuation">(</span><span class="string">'[Copy Places]: Preparing to save place'</span><span class="punctuation">)</span><span class="punctuation">;</span>
  <span class="string">`</span><span class="punctuation">;</span>

  <span class="comment">// Open each URL in a new tab, then run the script from above</span>
  <span class="keyword">const</span> win <span class="operator">=</span> window<span class="punctuation">.</span><span class="function">open</span><span class="punctuation">(</span>link<span class="punctuation">,</span> <span class="string">'_blank'</span><span class="punctuation">)</span><span class="punctuation">;</span>
  win<span class="punctuation">.</span><span class="function-variable function">onload</span> <span class="operator">=</span> <span class="punctuation">(</span><span class="punctuation">)</span> <span class="operator">=&gt;</span> <span class="punctuation">&#123;</span>
    win<span class="punctuation">.</span><span class="function">Function</span><span class="punctuation">(</span>scripts<span class="punctuation">)</span><span class="punctuation">(</span><span class="punctuation">)</span><span class="punctuation">;</span>
  <span class="punctuation">&#125;</span><span class="punctuation">;</span>
<span class="punctuation">&#125;</span>

<span class="comment">// This function loops through all the URLs and opens them in a new tab</span>
mapURLs<span class="punctuation">.</span><span class="function">forEach</span><span class="punctuation">(</span>savePlace<span class="punctuation">)</span><span class="punctuation">;</span>
</code></pre>

  {#if mapURLs.length}
    <div in:scale>
      <UIButtonCopy class="mx-auto" {copyText}>Copy code</UIButtonCopy>
    </div>
  {:else}
    <div class="py-2 text-xl">&nbsp;</div>
  {/if}
</div>
