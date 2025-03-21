
var text  = "";
export function AddToPdf(){
     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (Array.isArray(tabs) && tabs.length > 0 && tabs[0].id) {
            chrome.scripting.executeScript({
              target: { tabId: tabs[0].id },
              function: () => {
                text = window.getSelection().toString();
                if(text.length > 0){
                  chrome.storage.local.get(["selectedText"]).then((result) => {
                    let paragraphs = result.selectedText || [];
                    paragraphs = [...paragraphs, text];
                  
                  chrome.storage.local.set({selectedText : paragraphs}, () => {
                    console.log("Text stored locally");
                    alert("Text Stored Locally")
                  });
                });
                }
                else {alert("please select the text")}
              }
            });
          } else {
            console.error("No active tab found or tabs is not an array:", tabs);
          }
        });
}