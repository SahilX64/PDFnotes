import jsPDF from 'jspdf';

export function GeneratePdf(){
     chrome.storage.local.get(["selectedText"]).then((result) => {
        var pdfText = result.selectedText;
        var doc = new jsPDF('p', 'in', 'a4');
        const lineHeight = 0.25;
        let verticalOffset = 0.5;
        pdfText.forEach((paragraph) => {
        var textLines = doc.splitTextToSize(paragraph, 7.25);
        doc.text('\u2022', 0.35, verticalOffset);
        textLines.forEach((line) => {
          if(verticalOffset + lineHeight > 11.25){
            doc.addPage();
            verticalOffset = 0.5;
          }
          doc.text(line, 0.5, verticalOffset);
          verticalOffset += lineHeight;
        });
      });
        doc.save('a4.pdf');
        });
        chrome.storage.local.clear();
}