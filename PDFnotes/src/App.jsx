import { AddToPdf } from './AddToPdf';
import './App.css';
import extensionLogo from './assets/PDFnotesLogo500.png';
import { GeneratePdf } from './GeneratePdf';

function App() {
  
  
  function handleClick(){
   AddToPdf();
  }

  function makePDF(){
   GeneratePdf();
  }


  return (
    <>
      <div>
          <img src={extensionLogo} className="logo" alt="extension logo" />
      </div>
      <p className='instruction'><b>Select the text to be added to the PDF</b></p>
      <div className="card">
        <button onClick={handleClick}>
          Add to PDF
        </button>
        <button onClick={makePDF}>
          Download PDF
        </button>
      </div>
    </>
  )
}

export default App
