// content.js - Simple YT Ad Blocker for Firefox

function skipAds() {
    const video = document.querySelector("video");
    const skipButton = document.querySelector(".ytp-ad-skip-button, .ytp-ad-skip-button-modern");
    const adContainer = document.querySelector(".ad-showing, .ytp-ad-player-overlay");

    if (skipButton) {
        console.log("[Simple YT Ad Blocker] Skip button detected. Clicking...");
        skipButton.click(); // Klik op de "Skip Ad"-knop als die beschikbaar is
    }

    if (adContainer || (video && video.duration < 60)) {
        console.log("[Simple YT Ad Blocker] Ad detected. Skipping...");
        if (video) {
            video.currentTime = video.duration; // Spring naar het einde van de advertentie
        }
    }
}

// MutationObserver om advertenties en de skip-knop dynamisch te detecteren
const observer = new MutationObserver(skipAds);
observer.observe(document.body, { childList: true, subtree: true });

// Fallback interval check (elke seconde) voor als de observer iets mist
setInterval(skipAds, 1000);

console.log("[Simple YT Ad Blocker] Active and running.");
