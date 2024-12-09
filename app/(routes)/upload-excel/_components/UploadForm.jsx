"use client";
import React, { useEffect, useState } from "react";
import { ChevronLeft, Loader2, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import ExcelViewer from "./ExcelViewer"; // Import the Excel Viewer component

function UploadForm({ setFormValue }) {
    const [uploadedFiles, setUploadedFiles] = useState([]); // State to hold the list of file names
    const [fileName, setFileName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [uploadFile, setUploadFile] = useState(null);
    const [showViewer, setShowViewer] = useState(false); // State to toggle Excel Viewer

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setIsLoading(true)
            const reader = new FileReader();
            reader.onload = (e) => {
                setUploadFile(e.target.result); // Binary data of the file
                setFormValue({ fileName: file.name, uploadFile: e.target.result });

            };
            reader.readAsBinaryString(file); // Read the file as binary
            setUploadedFiles(prevFiles => [...prevFiles, file.name]);

            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        }
    };

    const handleUpload = () => {
        if (fileName && uploadFile) {
            setShowViewer(true); // Show Excel Viewer
        }
    };

    useEffect(() => {
        setFormValue({ fileName, uploadFile });
    }, [fileName]);

    if (showViewer) {
        // Render Excel Viewer if file is uploaded
        return <ExcelViewer file={uploadFile} />;
    }

    return (
        <div className="p-4">
            {/* <Image src="/logo.svg" alt="logo" width={170} height={120} /> */}
            <div className="mt-2">
                <h1 className="font-bold text-xl my-2 text-center text-blue-600">Upload Excel File</h1>
                <hr />
            </div>
            <div className="flex flex-col gap-3 mt-3">

                <h1 className="font-bold">Select File*</h1>
                <Button
                    className="w-full mb-4 flex items-center gap-3 h-10"
                    onClick={() => document.getElementById('fileInput').click()} // Trigger file input on button click
                >
                    {!isLoading ? (
                        <Plus /> // Show the Plus icon when not loading
                    ) : (
                        <Loader2 className="animate-spin mr-1" /> // Show the loading spinner when loading
                    )}
                    {!isLoading ? "Upload" : ""} {/* Show "Upload" text when not loading */}
                </Button>

                {/* Hidden file input */}
                <Input
                    id="fileInput"
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleFileChange}
                    className="hidden" // Hide the default input button
                />
            </div>
            <Link href="/">
                <Button className="w-full flex gap-1  items-center">
                    <ChevronLeft /> Cancel
                </Button>
            </Link>

            <div className="mt-4 border p-2">
                <h2 className="font-bold text-center">Uploaded Files:</h2>
                <ul className="list-decimal list-inside my-3">
                    {uploadedFiles.map((fileName, index) => (
                        <li className="my-2" key={index}>{fileName}</li> // Render file names
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default UploadForm;
