import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { 
  vendorBillsData, 
  customerInvoicesData, 
  arAgeingData, 
  incomeStatementData,
  getYTDRevenue,
  getNetIncome,
  getGrossMargin
} from '../data';

export const exportToPDF = async (elementId: string, filename: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Add company branding
    pdf.setFontSize(20);
    pdf.setTextColor(0, 0, 0);
    pdf.text('Financial AI Assistant', 20, 20);
    pdf.setFontSize(12);
    pdf.setTextColor(100, 100, 100);
    pdf.text('Professional Financial Report', 20, 28);
    pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 35);
    
    // Add report content
    const imgWidth = 170;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 45;

    pdf.addImage(imgData, 'PNG', 20, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 20, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Error generating PDF. Please try again.');
  }
};

export const exportToExcel = (data: any[], filename: string, sheetName: string = 'Data') => {
  try {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    
    // Add styling
    const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1');
    for (let col = range.s.c; col <= range.e.c; col++) {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
      if (worksheet[cellAddress]) {
        worksheet[cellAddress].s = {
          font: { bold: true },
          fill: { fgColor: { rgb: 'f0f0f0' } }
        };
      }
    }
    
    XLSX.writeFile(workbook, filename);
  } catch (error) {
    console.error('Error generating Excel:', error);
    alert('Error generating Excel file. Please try again.');
  }
};

export const exportToCSV = (data: any[], filename: string) => {
  try {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const csv = XLSX.utils.sheet_to_csv(worksheet);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, filename);
  } catch (error) {
    console.error('Error generating CSV:', error);
    alert('Error generating CSV file. Please try again.');
  }
};

export const shareByEmail = (reportType: string, data: any) => {
  const subject = `Financial Report - ${reportType}`;
  const body = `Hi,\n\nPlease find attached the ${reportType} report generated from our Financial AI Assistant.\n\nSummary:\n${JSON.stringify(data, null, 2)}\n\nBest regards,\nFinancial AI Assistant`;
  
  const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.open(mailtoLink, '_blank');
};

export const getFinancialSummary = () => {
  const ytdRevenue = getYTDRevenue();
  const netIncome = getNetIncome();
  const grossMargin = getGrossMargin();
  
  return {
    ytdRevenue,
    netIncome,
    grossMargin,
    totalVendorBills: vendorBillsData.length,
    totalCustomerInvoices: customerInvoicesData.length,
    totalAROutstanding: arAgeingData.reduce((sum, item) => sum + item.total, 0),
    generatedAt: new Date().toISOString()
  };
};

export const printReport = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  printWindow.document.write(`
    <html>
      <head>
        <title>Financial Report</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .header h1 { color: #000; margin: 0; }
          .header p { color: #666; margin: 5px 0; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f5f5f5; font-weight: bold; }
          .charts { display: none; }
          @media print {
            body { margin: 0; }
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Financial AI Assistant</h1>
          <p>Professional Financial Report</p>
          <p>Generated on: ${new Date().toLocaleDateString()}</p>
        </div>
        ${element.outerHTML}
      </body>
    </html>
  `);
  
  printWindow.document.close();
  printWindow.print();
};