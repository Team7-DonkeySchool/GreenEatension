// Récupère l'onglet actif
chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    // Récupère la sélection de texte dans la page
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: () => {
        return window.getSelection().toString();
      }
    }, function(selection) {
      // Envoie la sélection sur un autre site
      if (selection[0].result) {
        const text = encodeURIComponent(selection[0].result);
        const url = "https://www.google.com/?text=" + text;
        chrome.tabs.create({ url: url });
      }
    });
  });
