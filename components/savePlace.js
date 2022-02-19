export function savePlace(link) {
  const scripts = `
    observer = new MutationObserver((mutations, me) => {
      const saveButton = document.querySelector('button[data-value="Save"]');
      const starredPlacesLI = document.querySelector('ul[aria-label="Save in your lists"] li:nth-last-of-type(2)');

      // Sometimes the click doesn't register, so another click is needed
      if (saveButton) {
        console.log('[Copy Places]: Found save button');
        saveButton.click();
      } else {
        console.log('[Copy Places]: Looking for save button');
      }

      if (starredPlacesLI) {
        console.log('[Copy Places]: Found starred places button');
        starredPlacesLI.click();
        console.log('[Copy Places]: Saved location!');

        me.disconnect();
        return;
      } else {
        console.log('[Copy Places]: Looking for starred places button');
      }
    });

    observer.observe(document, { childList: true, subtree: true });
    console.log('[Copy Places]: Preparing to save place');
  `;

  const win = window.open(link, '_blank');
  win.onload = () => {
    win.Function(scripts)();
    console.log(`[Copy Places]: Saved ${link}`);
  };
}
