chrome.storage.local.get('blockedCount', (data) => {
    if (data.blockedCount === undefined) {
        chrome.storage.local.set({ blockedCount: 0 });
    }
});

chrome.tabs.onCreated.addListener((tab) => {
    chrome.storage.sync.get('enabled', (data) => {
        if (!data.enabled) return;

        if (!tab.url.startsWith('chrome://')) {
            chrome.tabs.remove(tab.id);
            console.log('Closed new tab:', tab.url);

            chrome.storage.local.get('blockedCount', (data) => {
                let count = data.blockedCount || 0;
                chrome.storage.local.set({ blockedCount: count + 1 });
            });
        }
    });
});
