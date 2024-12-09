"use client";
import { Button } from "@/components/ui/button";
import { FolderPlus, Loader2, Plus, Menu, X } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

function SideNavBar() {
    const [loading, setLoading] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleClick = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <div className="flex md:hidden p-4 bg-blue-400 text-white justify-between items-center">
                <Image src="/logo.svg" alt="logo" width={120} height={80} />
                <button onClick={toggleMenu}>
                    <Menu size={24} />
                </button>
            </div>

            {/* Sidebar */}
            <div
                className={`fixed md:static top-0 left-0 z-50 md:w-64 w-full h-screen bg-blue-50 shadow-md transform transition-transform duration-300 ${
                    isMenuOpen ? "translate-x-0" : "-translate-x-full"
                } md:translate-x-0`}
            >
                <div className="p-4 relative">
                    {/* Close Button for Mobile */}
                    <button
                        className="absolute top-4 right-4 md:hidden"
                        onClick={toggleMenu}
                    >
                        <X size={24} />
                    </button>

                    <Link href={"/"}>
                        <Image src="/logo.svg" alt="logo" width={170} height={120} />
                    </Link>

                    <div className="mt-8">
                        {/* New Chat Button */}
                        <Link href={"/upload-excel"}>
                            <Button
                                className="w-full mb-4 flex items-center gap-3 h-10"
                                onClick={handleClick}
                                disabled={loading}
                            >
                                {loading ? <Loader2 className="animate-spin" /> : <Plus />}
                                <h1>{loading ? "Loading..." : "New Chat"}</h1>
                            </Button>
                        </Link>

                        {/* New Folder Button */}
                        <Button className="w-full mb-4 flex items-center gap-3 h-10">
                            <FolderPlus />
                            <h1>New Folder</h1>
                        </Button>
                    </div>

                    <div className="mt-20 border-t border-slate-300 w-full p-2">
                        <div className="flex justify-center items-center">
                            <Button>Sign In</Button>
                        </div>

                        <div className="mt-14">
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
                </div>
            </div>

            {/* Overlay for Mobile */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black bg-opacity-80 md:hidden"
                    onClick={toggleMenu}
                ></div>
            )}
        </>
    );
}

export default SideNavBar;
