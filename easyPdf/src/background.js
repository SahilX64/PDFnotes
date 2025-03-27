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
  console.log("📩 Background received message:", message);

  if (message.type === "notify") {
      // Send message to content script
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs.length === 0) return;

          chrome.tabs.sendMessage(tabs[0].id, { type: "notify" }, (response) => {
              console.log("📤 Sent message to content script", response);
          });
      });
  }

  sendResponse({ status: "Message handled in background" });
  return true; // Ensures the response is handled asynchronously
});




// chrome.runtime.onMessage.addListener((message) => {
//   if (message.action === "notify") {
//       chrome.notifications.create("notifId",{
//           type: "basic",
//           iconUrl: "./assets/icon32.png",
//           title: "Storage Updated",
//           message: "Your data has been saved!"
//       },
//       (notifId) => {
//         setTimeout(() => {
//             chrome.notifications.clear(notifId);
//         }, 3000); // Clears after 5 seconds
//     });
//   }
// });
