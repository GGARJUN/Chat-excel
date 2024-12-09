import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { Loader2, ZoomIn, ZoomOut, Resize, RotateCw } from "lucide-react"; // Import icons

const ExcelViewer = ({ fileData, fileName }) => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [sheetNames, setSheetNames] = useState([]); // List of sheet names
  const [activeSheet, setActiveSheet] = useState(""); // Currently active sheet
  const [isLoading, setIsLoading] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(100); // Zoom level in percentage

  useEffect(() => {
    if (fileData) {
      setTimeout(() => {
        const workbook = XLSX.read(fileData, { type: "binary" });

        // Get all sheet names
        setSheetNames(workbook.SheetNames);

        // Default to the first sheet
        const initialSheetName = workbook.SheetNames[0];
        loadSheet(workbook, initialSheetName);
        setActiveSheet(initialSheetName);
      }, 2000); // Simulate a delay
    }
  }, [fileData]);

  const loadSheet = (workbook, sheetName) => {
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    const [headerRow, ...rows] = jsonData;

    setColumns(headerRow || []);
    setData(rows || []);
    setIsLoading(false);
  };

  const handleSheetChange = (sheetName) => {
    setIsLoading(true); // Show loader during sheet switching
    setTimeout(() => {
      const workbook = XLSX.read(fileData, { type: "binary" });
      loadSheet(workbook, sheetName);
      setActiveSheet(sheetName);
    }, 500); // Simulate a small delay for switching
  };

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 10, 200));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 10, 50));
  const handleResetZoom = () => setZoomLevel(100);

  return (
    <div className="w-full p-2">
      <div className=" flex justify-between items-center">
        <h2 className="font-bold text-lg text-gray-700">
          <span className="text-blue-600">{fileName}</span>
        </h2>


        {/* Zoom Controls */}
        <div className="flex justify-end items-center rounded-md border-2">
          <button
            onClick={handleZoomOut}
            className=" rounded p-1  hover:bg-gray-200"
          >
            <ZoomOut className="text-gray-600 scale-75" size={20} />
          </button>
          <button
            onClick={handleResetZoom}
            className=" rounded p-1 hover:bg-gray-200"
          >
            <RotateCw className="text-gray-600 scale-75" size={20} />
          </button>
          <button
            onClick={handleZoomIn}
            className=" rounded p-1 hover:bg-gray-200"
          >
            <ZoomIn className="text-gray-600 scale-75" size={20} />
          </button>
        </div>

      </div>

      {/* Sheet Selection
      {sheetNames.length > 0 && (
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
        <div className="flex justify-center items-center h-[490px]">
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
                    className="text-left p-3 border border-gray-300 font-bold text-sm"
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
                  className={`hover:bg-blue-50 ${rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                >
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="p-3 border border-gray-300 text-sm text-gray-700"
                    >
                      {cell || ""}
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