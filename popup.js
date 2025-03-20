// popup.js - External script for popup.html
document.getElementById("reload-btn").addEventListener("click", () => {
    browser.runtime.reload();
});
