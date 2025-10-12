
import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Button } from '@/components/ui';

interface PDFExporterProps {
  contentRef: React.RefObject<HTMLDivElement>;
  fileName: string;
}

const PDFExporter: React.FC<PDFExporterProps> = ({ contentRef, fileName }) => {
  const handleExport = () => {
    if (contentRef.current) {
      html2canvas(contentRef.current).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${fileName}.pdf`);
      });
    }
  };

  return <Button onClick={handleExport}>Download PDF</Button>;
};

export default PDFExporter;
