function skipAds() {
    const video = document.querySelector("video");
    const skipButton = document.querySelector(".ytp-ad-skip-button, .ytp-ad-skip-button-modern");
    const adContainer = document.querySelector(".ad-showing, .ytp-ad-player-overlay");

    // Skip ads if detected
    if (adContainer || (video && video.duration < 60)) {
        console.log("[Simple YT Ad Blocker] Ad detected. Skipping...");
        video.currentTime = video.duration; // Jump to end of ad
        skipButton?.click(); // Click skip button if available
    }
}

// MutationObserver to detect ad elements dynamically
const observer = new MutationObserver(skipAds);
observer.observe(document.body, { childList: true, subtree: true });

// Fallback interval check (every 1s) in case the observer misses something
setInterval(skipAds, 1000);

console.log("[Simple YT Ad Blocker] Active and running.");