<script lang="ts">
  export let mapURLs: string[] = [];

  import { scale } from 'svelte/transition';
  import { openInChunks, savePlace } from './scripts';
  import MapLinks from './MapLinks.svelte';
  import UIButtonCopy from './UIButtonCopy.svelte';

  // Wrap each URL in backticks to create valid JavaScript for the clipboard
  $: copyText = `
    ${savePlace}
    ${openInChunks}
    mapURLs=[${mapURLs.map((url) => `\`${url}\``)}];
    openInChunks(mapURLs);
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
    <span class="comment">// Look for the save button, then click on it when it's found</span>
    buttonObserver <span class="operator">=</span> <span class="keyword">new</span> <span class="class-name">MutationObserver</span><span class="punctuation">(</span><span class="punctuation">(</span><span class="parameter">mutationsList<span class="punctuation">,</span> observer</span><span class="punctuation">)</span> <span class="operator">=&gt;</span> <span class="punctuation">&#123;</span>
      <span class="keyword">const</span> saveButton <span class="operator">=</span> document<span class="punctuation">.</span><span class="function">querySelector</span><span class="punctuation">(</span><span class="string">'button[data-value="Save"]'</span><span class="punctuation">)</span><span class="punctuation">;</span>

      console<span class="punctuation">.</span><span class="function">log</span><span class="punctuation">(</span><span class="string">'[Copy Places]: Looking for save button'</span><span class="punctuation">)</span><span class="punctuation">;</span>
      <span class="keyword">if</span> <span class="punctuation">(</span>saveButton<span class="punctuation">)</span> <span class="punctuation">&#123;</span>
        console<span class="punctuation">.</span><span class="function">log</span><span class="punctuation">(</span><span class="string">'[Copy Places]: Found save button'</span><span class="punctuation">)</span><span class="punctuation">;</span>
        saveButton<span class="punctuation">.</span><span class="function">click</span><span class="punctuation">(</span><span class="punctuation">)</span><span class="punctuation">;</span>

        observer<span class="punctuation">.</span><span class="function">disconnect</span><span class="punctuation">(</span><span class="punctuation">)</span><span class="punctuation">;</span>
        <span class="keyword">return</span><span class="punctuation">;</span>
      <span class="punctuation">&#125;</span>
    <span class="punctuation">&#125;</span><span class="punctuation">)</span><span class="punctuation">;</span>

    <span class="comment">// Wait for the dropdown menu to open, then click on Starred Places</span>
    listObserver <span class="operator">=</span> <span class="keyword">new</span> <span class="class-name">MutationObserver</span><span class="punctuation">(</span><span class="punctuation">(</span><span class="parameter">mutationsList<span class="punctuation">,</span> observer</span><span class="punctuation">)</span> <span class="operator">=&gt;</span> <span class="punctuation">&#123;</span>
      <span class="keyword">const</span> starredPlacesLI <span class="operator">=</span> document<span class="punctuation">.</span><span class="function">querySelector</span><span class="punctuation">(</span><span class="string">'ul[aria-label="Save in your lists"] li:nth-last-of-type(2)'</span><span class="punctuation">)</span><span class="punctuation">;</span>

      console<span class="punctuation">.</span><span class="function">log</span><span class="punctuation">(</span><span class="string">'[Copy Places]: Looking for starred places button'</span><span class="punctuation">)</span><span class="punctuation">;</span>
      <span class="keyword">if</span> <span class="punctuation">(</span>starredPlacesLI<span class="punctuation">)</span> <span class="punctuation">&#123;</span>
        console<span class="punctuation">.</span><span class="function">log</span><span class="punctuation">(</span><span class="string">'[Copy Places]: Found starred places button'</span><span class="punctuation">)</span><span class="punctuation">;</span>
        starredPlacesLI<span class="punctuation">.</span><span class="function">click</span><span class="punctuation">(</span><span class="punctuation">)</span><span class="punctuation">;</span>
        console<span class="punctuation">.</span><span class="function">log</span><span class="punctuation">(</span><span class="string">'[Copy Places]: Saved location!'</span><span class="punctuation">)</span><span class="punctuation">;</span>

        observer<span class="punctuation">.</span><span class="function">disconnect</span><span class="punctuation">(</span><span class="punctuation">)</span><span class="punctuation">;</span>
        <span class="keyword">return</span><span class="punctuation">;</span>
      <span class="punctuation">&#125;</span>
    <span class="punctuation">&#125;</span><span class="punctuation">)</span><span class="punctuation">;</span>

    <span class="comment">// Close the tab when the save button changes to Saved</span>
    savedObserver <span class="operator">=</span> <span class="keyword">new</span> <span class="class-name">MutationObserver</span><span class="punctuation">(</span><span class="punctuation">(</span><span class="parameter">mutationsList<span class="punctuation">,</span> observer</span><span class="punctuation">)</span> <span class="operator">=&gt;</span> <span class="punctuation">&#123;</span>
      <span class="keyword">const</span> saveButton <span class="operator">=</span> document<span class="punctuation">.</span><span class="function">querySelector</span><span class="punctuation">(</span><span class="string">'button[data-value="Save"]'</span><span class="punctuation">)</span><span class="punctuation">;</span>

      console<span class="punctuation">.</span><span class="function">log</span><span class="punctuation">(</span><span class="string">'[Copy Places]: Confirming save and preparing to close tab'</span><span class="punctuation">)</span><span class="punctuation">;</span>
      <span class="keyword">if</span> <span class="punctuation">(</span>saveButton<span class="punctuation">.</span>textContent <span class="operator">===</span> <span class="string">"Saved"</span><span class="punctuation">)</span> <span class="punctuation">&#123;</span>
        observer<span class="punctuation">.</span><span class="function">disconnect</span><span class="punctuation">(</span><span class="punctuation">)</span><span class="punctuation">;</span>
        self<span class="punctuation">.</span><span class="function">close</span><span class="punctuation">(</span><span class="punctuation">)</span><span class="punctuation">;</span>
        <span class="keyword">return</span><span class="punctuation">;</span>
      <span class="punctuation">&#125;</span>
    <span class="punctuation">&#125;</span><span class="punctuation">)</span><span class="punctuation">;</span>

    buttonObserver<span class="punctuation">.</span><span class="function">observe</span><span class="punctuation">(</span>document<span class="punctuation">,</span> <span class="punctuation">&#123;</span> <span class="literal-property property">childList</span><span class="operator">:</span> <span class="boolean">true</span><span class="punctuation">,</span> <span class="literal-property property">subtree</span><span class="operator">:</span> <span class="boolean">true</span> <span class="punctuation">&#125;</span><span class="punctuation">)</span><span class="punctuation">;</span>
    listObserver<span class="punctuation">.</span><span class="function">observe</span><span class="punctuation">(</span>document<span class="punctuation">,</span> <span class="punctuation">&#123;</span> <span class="literal-property property">childList</span><span class="operator">:</span> <span class="boolean">true</span><span class="punctuation">,</span> <span class="literal-property property">subtree</span><span class="operator">:</span> <span class="boolean">true</span> <span class="punctuation">&#125;</span><span class="punctuation">)</span><span class="punctuation">;</span>
    savedObserver<span class="punctuation">.</span><span class="function">observe</span><span class="punctuation">(</span>document<span class="punctuation">,</span> <span class="punctuation">&#123;</span> <span class="literal-property property">childList</span><span class="operator">:</span> <span class="boolean">true</span><span class="punctuation">,</span> <span class="literal-property property">subtree</span><span class="operator">:</span> <span class="boolean">true</span> <span class="punctuation">&#125;</span><span class="punctuation">)</span><span class="punctuation">;</span>
    console<span class="punctuation">.</span><span class="function">log</span><span class="punctuation">(</span><span class="string">'[Copy Places]: Preparing to save place'</span><span class="punctuation">)</span><span class="punctuation">;</span>
  <span class="string">`</span><span class="punctuation">;</span>

  <span class="comment">// Open each URL in a new tab, then run the script from above</span>
  <span class="keyword">const</span> win <span class="operator">=</span> window<span class="punctuation">.</span><span class="function">open</span><span class="punctuation">(</span>link<span class="punctuation">,</span> <span class="string">'_blank'</span><span class="punctuation">)</span><span class="punctuation">;</span>
  win<span class="punctuation">.</span><span class="function-variable function">onload</span> <span class="operator">=</span> <span class="punctuation">(</span><span class="punctuation">)</span> <span class="operator">=&gt;</span> <span class="punctuation">&#123;</span>
    win<span class="punctuation">.</span><span class="function">Function</span><span class="punctuation">(</span>scripts<span class="punctuation">)</span><span class="punctuation">(</span><span class="punctuation">)</span><span class="punctuation">;</span>
  <span class="punctuation">&#125;</span><span class="punctuation">;</span>
<span class="punctuation">&#125;</span>

<span class="comment">// This function groups URLs in chunks of 5 to lessen the CPU load</span>
<span class="comment">// then it opens batches of URLs in new tabs every 5 seconds</span>
<span class="keyword">function</span> <span class="function">openInChunks</span><span class="punctuation">(</span><span class="parameter">urls <span class="operator">=</span> <span class="punctuation">[</span><span class="punctuation">]</span></span><span class="punctuation">)</span> <span class="punctuation">&#123;</span>
  <span class="keyword">const</span> chunkSize <span class="operator">=</span> <span class="number">5</span><span class="punctuation">;</span>
  <span class="keyword">const</span> chunks <span class="operator">=</span> urls<span class="punctuation">.</span><span class="function">reduce</span><span class="punctuation">(</span><span class="punctuation">(</span><span class="parameter">chunks<span class="punctuation">,</span> url<span class="punctuation">,</span> index</span><span class="punctuation">)</span> <span class="operator">=&gt;</span> <span class="punctuation">&#123;</span>
    <span class="keyword">const</span> chunkIndex <span class="operator">=</span> Math<span class="punctuation">.</span><span class="function">floor</span><span class="punctuation">(</span>index <span class="operator">/</span> chunkSize<span class="punctuation">)</span><span class="punctuation">;</span>
    <span class="keyword">if</span> <span class="punctuation">(</span><span class="operator">!</span>chunks<span class="punctuation">[</span>chunkIndex<span class="punctuation">]</span><span class="punctuation">)</span> <span class="punctuation">&#123;</span>
      chunks<span class="punctuation">[</span>chunkIndex<span class="punctuation">]</span> <span class="operator">=</span> <span class="punctuation">[</span><span class="punctuation">]</span><span class="punctuation">;</span>
    <span class="punctuation">&#125;</span>

    chunks<span class="punctuation">[</span>chunkIndex<span class="punctuation">]</span><span class="punctuation">.</span><span class="function">push</span><span class="punctuation">(</span>url<span class="punctuation">)</span><span class="punctuation">;</span>

    <span class="keyword">return</span> chunks<span class="punctuation">;</span>
  <span class="punctuation">&#125;</span><span class="punctuation">,</span> <span class="punctuation">[</span><span class="punctuation">]</span><span class="punctuation">)</span><span class="punctuation">;</span>

  chunks<span class="punctuation">.</span><span class="function">forEach</span><span class="punctuation">(</span><span class="punctuation">(</span><span class="parameter">chunk<span class="punctuation">,</span> index</span><span class="punctuation">)</span> <span class="operator">=&gt;</span> <span class="punctuation">&#123;</span>
    <span class="keyword">const</span> millisecondOffset <span class="operator">=</span> <span class="number">5000</span> <span class="operator">*</span> index<span class="punctuation">;</span>

    <span class="function">setTimeout</span><span class="punctuation">(</span><span class="punctuation">(</span><span class="punctuation">)</span> <span class="operator">=&gt;</span> <span class="punctuation">&#123;</span>
      chunk<span class="punctuation">.</span><span class="function">forEach</span><span class="punctuation">(</span>savePlace<span class="punctuation">)</span><span class="punctuation">;</span>
    <span class="punctuation">&#125;</span><span class="punctuation">,</span> millisecondOffset<span class="punctuation">)</span><span class="punctuation">;</span>
  <span class="punctuation">&#125;</span><span class="punctuation">)</span><span class="punctuation">;</span>
<span class="punctuation">&#125;</span>

<span class="comment">// After the setup, call the function</span>
<span class="function">openInChunks</span><span class="punctuation">(</span>mapURLs<span class="punctuation">)</span><span class="punctuation">;</span>
</code></pre>

  {#if mapURLs.length}
    <div in:scale>
      <UIButtonCopy class="mx-auto" {copyText}>Copy code</UIButtonCopy>
    </div>
  {:else}
    <div class="py-2 text-xl">&nbsp;</div>
  {/if}
</div>
