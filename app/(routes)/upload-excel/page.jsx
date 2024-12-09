"use client";
import React, { useState } from "react";
import UploadForm from "./_components/UploadForm";
import ExcelViewer from "./_components/ExcelViewer";
import Chatbot from "./_components/Chatbot";

function UploadExcel() {
  const [formValue, setFormValue] = useState();

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 h-screen">
      {/* Sidebar for Upload Form */}
      <div className="shadow-md border h-full">
        <UploadForm setFormValue={(v) => setFormValue(v)} />
      </div>

      {/* Main Content Area */}
      <div className="md:col-span-4 flex flex-col h-full">
        {formValue?.uploadFile ? (
          <div className="flex flex-col md:flex-row h-full">
            {/* Excel Viewer */}
            <div className="flex-1 overflow-auto h-screen border-r">
            <ExcelViewer fileData={formValue.uploadFile} fileName={formValue.fileName} />

            </div>

            {/* Chatbot */}
            <div className="flex-1 overflow-auto">
              <Chatbot />
            </div>
          </div>
        ) : (
          <div className="p-4 flex items-center justify-center h-full">
            <p className="text-center text-gray-500">
              Upload an Excel file to preview its content.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadExcel;
