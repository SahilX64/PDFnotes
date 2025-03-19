
import jsPDF from 'jspdf';
import './App.css';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';


function App() {
  
  var text  = "";
  function handleClick(){
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (Array.isArray(tabs) && tabs.length > 0 && tabs[0].id) {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: () => {
            text = window.getSelection().toString();
            if(text.length > 0){
              chrome.storage.local.set({selectedText : text}, () => {
                console.log("Text stored locally");
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

  function makePDF(){
    chrome.storage.local.get(["selectedText"]).then((result) => {
    var pdfText = result.selectedText;
    var doc = new jsPDF('p', 'in', 'a4');
    var textLines = doc.splitTextToSize(pdfText, 7.25);
    const lineHeight = 0.25;
    let verticalOffset = 0.5;
    
    textLines.forEach((line) => {
      if(verticalOffset + lineHeight > 11.25){
        doc.addPage();
        verticalOffset = 0.5;
      }
      doc.text(line, 0.5, verticalOffset);
      verticalOffset += lineHeight;
    });
    doc.save('a4.pdf');
    });
  }


  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={handleClick}>
          Add to PDF.
        </button>
        <button onClick={makePDF}>
          Download PDF
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      
      
    </>
  )
}

export default App
