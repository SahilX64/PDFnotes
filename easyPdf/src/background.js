import { AddToPdf } from './AddToPdf';

chrome.commands.onCommand.addListener((command) => {
  if (command === "trigger_action") {
    console.log("Shortcut pressed!");
    // Call the imported function
    AddToPdf();
  }
});
