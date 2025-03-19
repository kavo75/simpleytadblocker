// background.js - Simple YT Ad Blocker with logging

function logMessage(message) {
    console.log(`SYTBLOG: ${message}`);
}

logMessage("Background script started");

chrome.runtime.onInstalled.addListener(() => {
    logMessage("Extension installed or updated");
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.url.includes("youtube.com")) {
        logMessage(`YouTube tab updated: ${tab.url}`);
        chrome.tabs.sendMessage(tabId, { type: "CHECK_ADS" });
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "AD_DETECTED") {
        logMessage(`Ad detected on YouTube: ${sender.tab.url}`);
    } else if (message.type === "AD_SKIPPED") {
        logMessage("Ad successfully skipped");
    }
});
