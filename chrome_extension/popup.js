chrome.runtime.onMessage.addListener(function(message, sender) { 
    if (message == 'showbar') {
        // Note: When the API reaches the stable status, remove ".experimental"
        chrome.experimental.infobars.show({
            tabId: sender.tab.id,
            path: 'infobar.html#' + sender.tab.id
        });
    }
});