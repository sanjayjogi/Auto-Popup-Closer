const popupSelectors = [
    '.popup', '.modal', '.overlay', '.subscribe-modal', '#popup', '#newsletter'
];

function removePopup(el) {
    if (el) {
        el.remove();
        console.log('Popup removed:', el);
    }
}

function startPopupObserver() {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1) { // Element nodes only
                    popupSelectors.forEach(selector => {
                        if (node.matches(selector) || node.querySelector(selector)) {
                            removePopup(node);
                        }
                    });
                }
            });
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    window.alert = () => {};
    window.confirm = () => true;
    window.prompt = () => null;
}

chrome.storage.sync.get('enabled', (data) => {
    if (data.enabled) {
        startPopupObserver();
    }
});

chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'sync' && changes.enabled) {
        if (changes.enabled.newValue) {
            startPopupObserver();
        }
    }
});
