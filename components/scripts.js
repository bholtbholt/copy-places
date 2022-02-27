export function savePlace(link) {
  const scripts = `
    buttonObserver = new MutationObserver((mutationsList, observer) => {
      const saveButton = document.querySelector('button[data-value="Save"]');

      console.log('[Copy Places]: Looking for save button');
      if (saveButton) {
        console.log('[Copy Places]: Found save button');
        saveButton.click();

        observer.disconnect();
        return;
      }
    });

    listObserver = new MutationObserver((mutationsList, observer) => {
      const starredPlacesLI = document.querySelector('ul[aria-label="Save in your lists"] li:nth-last-of-type(2)');

      console.log('[Copy Places]: Looking for starred places button');
      if (starredPlacesLI) {
        console.log('[Copy Places]: Found starred places button');
        starredPlacesLI.click();
        console.log('[Copy Places]: Saved location!');

        observer.disconnect();
        return;
      }
    });

    savedObserver = new MutationObserver((mutationsList, observer) => {
      const saveButton = document.querySelector('button[data-value="Save"]');

      console.log('[Copy Places]: Confirming save and preparing to close tab');
      if (saveButton.textContent === "Saved") {
        observer.disconnect();
        self.close();
        return;
      }
    });

    buttonObserver.observe(document, { childList: true, subtree: true });
    listObserver.observe(document, { childList: true, subtree: true });
    savedObserver.observe(document, { childList: true, subtree: true });
    console.log('[Copy Places]: Preparing to save place');
  `;

  const win = window.open(link, '_blank');
  win.onload = () => {
    win.Function(scripts)();
    console.log(`[Copy Places]: Saved ${link}`);
  };
}

export function openInChunks(urls = []) {
  const chunkSize = 5;
  const chunks = urls.reduce((chunks, url, index) => {
    const chunkIndex = Math.floor(index / chunkSize);
    if (!chunks[chunkIndex]) {
      chunks[chunkIndex] = [];
    }

    chunks[chunkIndex].push(url);

    return chunks;
  }, []);

  chunks.forEach((chunk, index) => {
    const millisecondOffset = 5000 * index;

    setTimeout(() => {
      chunk.forEach(savePlace);
    }, millisecondOffset);
  });
}
