"use client"
import { Button } from '@/components/ui/button';
import { FolderPlus,  Loader2, Plus } from 'lucide-react';
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
    const [Loading, setLoading] = useState(false);
    const [uploadedFiles, setUploadedFiles] = useState([]); // State to hold the list of file names

    const handleClick = () => {
        setLoading(true);
        // Simulate loading for 2 seconds (you can replace it with your actual action)
        setTimeout(() => {
            setLoading(false);
        }, 2000);
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
                        <Button
                            className="w-full mb-4 flex items-center gap-3 h-10"
                            onClick={handleClick}
                            disabled={Loading} // Disable button while loading
                        >
                            {Loading ? (
                                <Loader2 /> // Show loading spinner instead of Plus icon
                            ) : (
                                <Plus />
                            )}
                            <h1>{Loading ? "" : "New Chat"}</h1>
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
