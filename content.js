// content.js - Simple YT Ad Blocker with logging

function logMessage(message) {
    console.log(`SYTBLOG: ${message}`);
}

logMessage("Content script loaded");

const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
            mutation.addedNodes.forEach((node) => {
                if (node.tagName === "DIV" && node.className.includes("ad-showing")) {
                    logMessage("Ad detected");
                    chrome.runtime.sendMessage({ type: "AD_DETECTED" });

                    const skipButton = document.querySelector(".ytp-ad-skip-button");
                    if (skipButton) {
                        logMessage("Skip button found, clicking...");
                        skipButton.click();
                        chrome.runtime.sendMessage({ type: "AD_SKIPPED" });
                    } else {
                        logMessage("No skip button found, attempting fast-forward...");
                        const video = document.querySelector("video");
                        if (video) {
                            video.currentTime = video.duration;
                            logMessage("Ad fast-forwarded");
                        }
                    }
                }
            });
        }
    });
});

observer.observe(document.body, { childList: true, subtree: true });

logMessage("Ad observer started");
