
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
                    if (chrome.runtime.lastError) {
                      console.error("Error setting storage:", chrome.runtime.lastError);
                      return;
                  }
                  chrome.runtime.sendMessage( { type: "notify" }, (response) =>{
                    if(chrome.runtime.lastError){
                      console.log("Error sending message to content script:", chrome.runtime.lastError)
                      return;
                    }
                    console.log("Message sent successfully", response);
                  });
                  });
                });
                }
                else {
                  alert("please select the text");
                }
              }
            });
          } else {
            console.error("No active tab found or tabs is not an array:", tabs);
          }
        });
}