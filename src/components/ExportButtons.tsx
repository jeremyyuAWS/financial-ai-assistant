import React, { useState } from 'react';
import { Download, FileText, Share2, Printer, Mail } from 'lucide-react';
import { exportToPDF, exportToExcel, exportToCSV, shareByEmail, printReport } from '../utils/exportUtils';

interface ExportButtonsProps {
  data: any[];
  filename: string;
  reportType: string;
  elementId?: string;
}

const ExportButtons: React.FC<ExportButtonsProps> = ({ 
  data, 
  filename, 
  reportType, 
  elementId = 'report-content' 
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleExport = async (type: 'pdf' | 'excel' | 'csv') => {
    setIsExporting(true);
    try {
      switch (type) {
        case 'pdf':
          await exportToPDF(elementId, `${filename}.pdf`);
          break;
        case 'excel':
          exportToExcel(data, `${filename}.xlsx`, reportType);
          break;
        case 'csv':
          exportToCSV(data, `${filename}.csv`);
          break;
      }
    } catch (error) {
      console.error('Export error:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleShare = () => {
    shareByEmail(reportType, data.slice(0, 3)); // Send sample data
    setShowShareMenu(false);
  };

  const handlePrint = () => {
    printReport(elementId);
    setShowShareMenu(false);
  };

  return (
    <div className="relative">
      <div className="flex space-x-2">
        <button
          onClick={() => handleExport('pdf')}
          disabled={isExporting}
          className="flex items-center space-x-2 px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
          title="Export to PDF"
        >
          <FileText size={16} />
          <span>PDF</span>
        </button>
        
        <button
          onClick={() => handleExport('excel')}
          disabled={isExporting}
          className="flex items-center space-x-2 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
          title="Export to Excel"
        >
          <Download size={16} />
          <span>Excel</span>
        </button>
        
        <button
          onClick={() => handleExport('csv')}
          disabled={isExporting}
          className="flex items-center space-x-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          title="Export to CSV"
        >
          <Download size={16} />
          <span>CSV</span>
        </button>
        
        <button
          onClick={() => setShowShareMenu(!showShareMenu)}
          className="flex items-center space-x-2 px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          title="Share Options"
        >
          <Share2 size={16} />
          <span>Share</span>
        </button>
      </div>

      {showShareMenu && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
          <div className="py-1">
            <button
              onClick={handleShare}
              className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              <Mail size={16} />
              <span>Share via Email</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
            >
              <Printer size={16} />
              <span>Print Report</span>
            </button>
          </div>
        </div>
      )}
      
      {isExporting && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-md">
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
            <span className="text-sm text-gray-600">Exporting...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExportButtons;