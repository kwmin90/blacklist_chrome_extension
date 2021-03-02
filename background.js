chrome.tabs.onActivated.addListener((tab) => {
  chrome.tabs.get(tab.tabId, (current_tab_info) => {
    if (/^https:\/\/manatoki95/.test(current_tab_info.url)) {
      chrome.tabs.executeScript(null, { file: "./foreground.js" }, () =>
        console.log("injected")
      );
    }
  });
  chrome.tabs.get(tab.tabId, (current_tab_info) => {
    if (/^https:\/\/newtoki95/.test(current_tab_info.url)) {
      chrome.tabs.executeScript(null, { file: "./foreground2.js" }, () =>
        console.log("injected2")
      );
    }
  });
});
