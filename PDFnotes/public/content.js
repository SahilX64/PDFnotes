
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Content script received message:", message);

    if (message.type === "notify") {
        // Perform any action required in the content script
       showNotification("Text is added to the PDF.")

        // Optionally send a response back to the background script
        sendResponse({ status: "Notification processed successfully in content script" });
    }

    return true; // Ensure asynchronous response handling if needed
});


function showNotification(text) {
    // Remove existing notification if any
    let existingNotif = document.getElementById("extension-notif");
    if (existingNotif) {existingNotif.remove();}

    // Create notification element
    let notif = document.createElement("div");
    notif.id = "extension-notif";
    notif.innerText = text;
    notif.style.position = "fixed";
    notif.style.bottom = "20px";
    notif.style.right = "20px";
    notif.style.background = "#333";
    notif.style.color = "#fff";
    notif.style.padding = "10px 15px";
    notif.style.borderRadius = "5px";
    notif.style.boxShadow = "0 2px 10px rgba(0,0,0,0.3)";
    notif.style.zIndex = "10000";
    notif.style.fontFamily = "Arial, sans-serif";

    document.body.appendChild(notif);

    // Remove notification after 3 seconds
    setTimeout(() => notif.remove(), 3000);
}
