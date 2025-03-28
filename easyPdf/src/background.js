import { AddToPdf } from './AddToPdf';

chrome.commands.onCommand.addListener((command) => {
  if (command === "trigger_action") {
    console.log("Shortcut pressed!");
    // Call the imported function
    AddToPdf();
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
      chrome.scripting.executeScript({
          target: { tabId: tab.id},
          files: ["content.js"]
      }).catch(err => console.error("Error injecting content script:", err));
      console.log("content script injected");
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Background received message:", message);

  if (message.type === "notify") {
      // Query the active tab
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs.length === 0) {
              sendResponse({ status: "No active tab found" });
              return;
          }
          // Send message to content script
          chrome.tabs.sendMessage(tabs[0].id, { type: "notify" }, (response) => {
              if (chrome.runtime.lastError) {
                  console.error("Error sending message to content script:", chrome.runtime.lastError);
                  sendResponse({ status: "Failed to send message to content script" });
                  return;
              }

              console.log("Sent message to content script", response);
              sendResponse({ status: "Message successfully sent to content script", response });
          });
      });

      return true; // Ensures sendResponse is handled asynchronously
  }

  sendResponse({ status: "Message type not recognized" });
  return true;
});




