"use client"
import { Button } from '@/components/ui/button';
import { FolderPlus, Plus } from 'lucide-react';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

function SideNavBar({ onFileUpload }) {
    const [isLoading, setIsLoading] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]); // State to hold the list of file names

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            onFileUpload(file);
            setIsLoading(true);

            // Add the uploaded file name to the list
            setUploadedFiles(prevFiles => [...prevFiles, file.name]);

            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        } else {
            alert("Please select a file to upload.");
        }
    };

    return (
        <>
            <div className='shadow-md h-screen p-4 border bg-blue-50'>
                <Link href={"/"}>
                    <Image src="/logo.svg" alt="logo" width={170} height={120} />
                </Link>

                <div className='mt-8'>
                    {/* New Chat button */}
                    <Link href={"/upload-excel"}>
                        <Button className="w-full mb-4 flex items-center gap-3 h-10">
                            <Plus />
                            <h1>New Chat</h1>
                        </Button>
                    </Link>

                    {/* New Folder button */}
                    <Button className="w-full mb-4 flex items-center gap-3 h-10">
                        <FolderPlus />
                        <h1>New Folder</h1>
                    </Button>
                </div>
            </div>

            <div className='absolute bottom-0 h-40 border-t-2 border-slate-300 w-full p-2'>
                <div className='flex justify-center items-center'>
                    <Button>Sign In</Button>
                </div>
                <div className='mt-14'>
                    <Select>
                        <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Language" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="Tamil">Tamil</SelectItem>
                                <SelectItem value="English">English</SelectItem>
                                <SelectItem value="Kannada">Kannada</SelectItem>
                                <SelectItem value="French">French</SelectItem>
                                <SelectItem value="Hindi">Hindi</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

            </div>
        </>
    );
}

export default SideNavBar;
