import React, { useEffect, useState } from "react";
import ExcelJS from "exceljs";
import { Loader2, ZoomIn, ZoomOut, RotateCw } from "lucide-react";
import { format } from "date-fns";

const ExcelViewer = ({ fileData, fileName }) => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [sheetNames, setSheetNames] = useState([]);
  const [activeSheet, setActiveSheet] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(100);

  useEffect(() => {
    if (fileData) {
      setTimeout(async () => {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(fileData);

        const sheetNames = workbook.worksheets.map((sheet) => sheet.name);
        setSheetNames(sheetNames);

        const initialSheet = workbook.worksheets[0];
        setActiveSheet(initialSheet.name);
        loadSheet(initialSheet);
      }, 2000);
    }
  }, [fileData]);

  const loadSheet = (sheet) => {
    const rows = [];
    const columns = [];

    sheet.eachRow((row, rowIndex) => {
      if (rowIndex === 1) {
        columns.push(...row.values.slice(1));
      } else {
        rows.push(row.values.slice(1));
      }
    });

    setColumns(columns || []);
    setData(rows || []);
    setIsLoading(false);
  };

  const handleSheetChange = (sheetName) => {
    setIsLoading(true);
    setTimeout(async () => {
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(fileData);

      const selectedSheet = workbook.worksheets.find(
        (sheet) => sheet.name === sheetName
      );

      if (selectedSheet) {
        loadSheet(selectedSheet);
        setActiveSheet(sheetName);
      }
    }, 500);
  };

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 10, 200));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 10, 50));
  const handleResetZoom = () => setZoomLevel(100);

  return (
    <div className="w-full p-2">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-lg text-gray-700">
          <span className="text-blue-600">{fileName}</span>
        </h2>
        <div className="flex justify-end items-center rounded-md border-2">
          <button onClick={handleZoomOut} className="rounded p-1 hover:bg-gray-200">
            <ZoomOut className="text-gray-600 scale-75" size={20} />
          </button>
          <button onClick={handleResetZoom} className="rounded p-1 hover:bg-gray-200">
            <RotateCw className="text-gray-600 scale-75" size={20} />
          </button>
          <button onClick={handleZoomIn} className="rounded p-1 hover:bg-gray-200">
            <ZoomIn className="text-gray-600 scale-75" size={20} />
          </button>
        </div>
      </div>
      {/* {sheetNames.length > 0 && (
        <div className="flex items-center gap-4 my-2">
          <span className="font-semibold text-gray-600">Sheets:</span>
          <ul className="flex gap-2">
            {sheetNames.map((sheetName) => (
              <li
                key={sheetName}
                className={`cursor-pointer px-3 py-1 rounded border ${
                  activeSheet === sheetName
                    ? "bg-blue-100 text-blue-700 border-blue-300"
                    : "bg-gray-100 text-gray-600 border-gray-300"
                } hover:bg-blue-50`}
                onClick={() => handleSheetChange(sheetName)}
              >
                {sheetName}
              </li>
            ))}
          </ul>
        </div>
      )} */}
      {isLoading ? (
        <div className="flex justify-center items-center ">
          <Loader2 className="animate-spin text-blue-500" size={40} />
        </div>
      ) : data.length > 0 ? (
        <div
          className="w-full max-w-4xl mt-2 h-[580px] overflow-auto border rounded-md shadow-lg"
          style={{ zoom: `${zoomLevel}%` }}
        >
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr className="bg-blue-100">
                {columns.map((col, index) => (
                  <th
                    key={index}
                    className="text-left  p-3 border border-gray-300 font-bold text-sm"
                  >
                    {col || "Column"}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={`hover:bg-blue-50 ${rowIndex % 2 === 0 ? "bg-gray-50 " : "bg-white"
                    }`}
                >
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="p-3 border border-gray-300 text-sm  text-gray-700"
                    >
                      {cell instanceof Date ? format(cell, "yyyy-MM-dd ") : cell || ""}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No data to display. Please upload a valid Excel file.</p>
      )}
    </div>
  );
};

export default ExcelViewer;
