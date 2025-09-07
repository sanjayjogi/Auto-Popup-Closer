const supremeBtn = document.getElementById('supremeToggle');
const blockedCountEl = document.getElementById('blockedCount');

chrome.storage.sync.get('enabled', (data) => {
    const enabled = data.enabled || false;
    supremeBtn.innerText = enabled ? 'Turn OFF' : 'Turn ON';
});

supremeBtn.addEventListener('click', () => {
    chrome.storage.sync.get('enabled', (data) => {
        const newState = !data.enabled;
        chrome.storage.sync.set({ enabled: newState });
        supremeBtn.innerText = newState ? 'Turn OFF' : 'Turn ON';
    });
});

chrome.storage.local.get('blockedCount', (data) => {
    blockedCountEl.innerText = data.blockedCount || 0;
});

chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && changes.blockedCount) {
        blockedCountEl.innerText = changes.blockedCount.newValue;
    }
});
