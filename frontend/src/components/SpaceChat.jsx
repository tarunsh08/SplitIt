import React, { useEffect, useState, useRef } from 'react'
import io from "socket.io-client"

// const socket = io("http://localhost:5000")
const socket = io(`${import.meta.env.VITE_SERVER_URL}`)

function SpaceChat({spaceId, user}) {
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        socket.emit("join-space", spaceId);

        socket.on("receive-message", (message) => {
            setMessages((prev) => [...prev, message]);
        });

        return () => {
            socket.off("receive-message");
        }
    }, [spaceId]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        
        const message = {
            sender: user.name,
            text,
            timestamp: new Date(),
            isSender: true
        };

        socket.emit("send-message", {spaceId, message});
        setText("");
    }

    return (
        <div className='flex flex-col h-[calc(100vh-200px)] md:h-[60vh] bg-zinc-700 rounded-lg shadow-lg overflow-hidden'>
            <div className="flex-1 overflow-y-auto scrollbar-hide p-3 md:p-4 space-y-3 bg-zinc-100 dark:bg-zinc-800">
                {messages.map((msg, idx) => (
                    <div 
                        key={idx} 
                        className={`flex ${msg.sender === user.name ? 'justify-end' : 'justify-start'}`}
                    >
                        <div 
                            className={`max-w-[75%] md:max-w-md px-3 py-2 text-sm md:text-base rounded-lg ${
                                msg.sender === user.name 
                                    ? 'bg-emerald-500 text-white rounded-br-none' 
                                    : 'bg-gray-200 text-gray-800 rounded-bl-none'
                            }`}
                        >
                            {msg.sender !== user.name && (
                                <div className="font-bold text-xs md:text-sm text-emerald-600">{msg.sender}</div>
                            )}
                            <div className="break-words">{msg.text}</div>
                            <div className="text-xs opacity-70 text-right mt-1">
                                {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            
            <form onSubmit={sendMessage} className="p-2 md:p-4 border-t dark:border-t-zinc-600 bg-zinc-200 dark:bg-zinc-700">
                <div className='flex gap-2'>
                    <input 
                        value={text} 
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Type a message..."
                        className='flex-1 text-sm md:text-base border rounded-full px-3 md:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-600 dark:focus:ring-zinc-400' 
                    />
                    <button 
                        type="submit"
                        className='bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-4 md:px-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-offset-2 dark:focus:ring-zinc-400 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-sm md:text-base whitespace-nowrap'
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SpaceChat