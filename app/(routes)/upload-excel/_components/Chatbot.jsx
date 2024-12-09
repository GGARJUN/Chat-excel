
"use client"
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { ArrowRightFromLine, Download, RotateCw, Send, Sparkles, TextCursor, Trash } from "lucide-react";
import React, { useState } from "react";


const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isGeneratingImage, setIsGeneratingImage] = useState(false);

    const apiKey = process.env.OPEN_API; // Add your API key securely in .env file

    const handleSend = async () => {

        if (!input.trim()) return;

        const url = "https://api.openai.com/v1/chat/completions";

        const data = {
            model: "gpt-4",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: input }
            ],
            max_tokens: 100,
            temperature: 0.7
        };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKey}`
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const result = await response.json();
            const assistantMessage = result.choices[0].message.content;

            setMessages([...messages, { role: "user", content: input }, { role: "assistant", content: assistantMessage }]);
            setInput("");
        } catch (error) {
            console.error("Error calling OpenAI API:", error);
        }
    };

    const handleGenerateImage = async () => {
        if (!input.trim()) return;

        const url = "https://api.openai.com/v1/images/generations";

        const data = {
            prompt: input,
            n: 1,
            size: "512x512"
        };

        try {
            setIsGeneratingImage(true);
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${apiKey}`
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const result = await response.json();
            const imageUrl = result.data[0].url;

            setMessages([...messages, { role: "user", content: input }, { role: "assistant", image: imageUrl }]);
            setInput("");
        } catch (error) {
            console.error("Error generating image:", error);
        } finally {
            setIsGeneratingImage(false);
        }
    };

    const handleDownloadImage = (url) => {
        const a = document.createElement("a");
        a.href = url;
        a.download = "generated-image.png";
        a.click();
    };

    const placeholders = [
        "Hello! 👋",
        "How can I assist you today?",
        "I'm here to help! 😊",
        "Message ChatGPT"
    ];

    const words = `Hello! 👋
I'm ChatGPT, your AI assistant. How can I assist you today? Whether you have questions, need advice, or just want to chat, I'm here to help! 😊`;


    const TopIcon = [
        {
            icon: <Send />,
        },
        {
            icon: <TextCursor />,
        },
        {
            icon: <ArrowRightFromLine />,
        },
        {
            icon: <RotateCw />,
        },
        {
            icon: <Trash />,
        },
    ]



    return (
        <div className="w-full h-screen px-2 mt-2">
            <div className="mb-4">
                <div className="flex justify-between items-center w-full">
                    <h1 className="font-medium text-xl mb-2">Chat</h1>
                    <div className="flex justify-center items-center gap-1 ">
                        {TopIcon.map((item, index) => (
                            <div key={index} className="scale-75 hover:scale-90">{item.icon}</div>
                        ))}
                    </div>
                </div>

                <div className="border-2 h-[520px] rounded-md p-2 bg-gray-50 overflow-y-scroll">
                    <TextGenerateEffect words={words} />
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`mb-4 ${msg.role === "user" ? "text-right" : "text-left"}`}>
                            {msg.image ? (
                                <div className="flex justify-start relative">
                                    <img
                                        src={msg.image}
                                        alt="Generated"
                                        className={`rounded shadow-md transition-opacity duration-500 h-72 w-72 object-cover ${isGeneratingImage ? "opacity-0" : "opacity-100"}`}
                                    />
                                    <button
                                        onClick={() => handleDownloadImage(msg.image)}
                                        className="text-sm scale-75 hover:scale-90 p-1 absolute left-64"
                                    >
                                        <Download />
                                    </button>
                                </div>
                            ) : (
                                <span className={msg.role === "user" ? "font-normal text-sm bg-blue-200 p-2 rounded-lg" : "font-normal  p-2 flex text-sm"}>
                                    {msg.content}
                                </span>
                            )}
                        </div>
                    ))}
                    {isGeneratingImage && (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex w- gap-2">

                <PlaceholdersAndVanishInput
                    placeholders={placeholders}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onSubmit={handleSend}

                />


                {/* <button
                    onClick={handleSend}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                >
                    Send
                </button> */}
                <button
                    onClick={handleGenerateImage}
                    className="bg-blue-600 text-white px-3 scale-75 hover:scale-90 ease-in-out transition-all  rounded-full hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                >
                    <Sparkles />
                </button>
            </div>
        </div>
    );
};

export default Chatbot;

