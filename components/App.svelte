<script lang="ts">
  import CodePreview from './CodePreview.svelte';

  let mapURLs: string[] = [];

  function onFileSelect(event) {
    const data = event.target.files[0];
    const reader = new FileReader();

    reader.readAsText(data);
    reader.onload = (e) => {
      const json = JSON.parse(e.target.result);
      mapURLs = json.features.map((f) => f.properties['Google Maps URL']);
    };
  }
</script>

<header>
  <!-- prettier-ignore -->
  <h1 class="text-5xl lg:text-7xl font-extrabold tracking-tight text-blue-500 mb-3 relative">
    Copy Places
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-40 w-40 absolute z-[-1] right-[2.5rem] bottom-[-1.2rem] text-amber-400"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fill-rule="evenodd"
        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
        clip-rule="evenodd"
      />
    </svg>
  </h1>
  <p class="text-2xl lg:text-3xl mb-10 lg:font-light text-blue-500">
    Copy starred places from one Google Maps account to another.
  </p>
  <input
    class="p-3 rounded-xl bg-amber-100 dark:bg-slate-700 mb-2"
    type="file"
    accept=".json"
    on:change={onFileSelect}
  />
  <p class="text-xs">Upload <code>Saved Places.json</code> from Google Takeout.</p>
</header>
<CodePreview {mapURLs} />
