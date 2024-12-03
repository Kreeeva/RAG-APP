'use client';

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Send, Menu } from "lucide-react";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = { role: 'user' as const, content: input };
    setMessages([...messages, newMessage]);
    setInput('');

    try {
      const response = await fetch('http://localhost:8000/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: input }),
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex h-screen">
      <div className={`bg-gray-100 ${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300`}>
        <div className="p-4">
          <h2 className="font-bold mb-4">Chat History</h2>
          <ScrollArea className="h-[calc(100vh-8rem)]">
          </ScrollArea>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="bg-white p-4 shadow-sm flex items-center">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="ml-4 font-semibold">Document Chat</h1>
        </div>

        <ScrollArea className="flex-1 p-4">
          {messages.map((message, index) => (
            <Card key={index} className={`mb-4 p-4 ${
              message.role === 'user' ? 'bg-blue-50 ml-12' : 'bg-gray-50 mr-12'
            }`}>
              {message.content}
            </Card>
          ))}
        </ScrollArea>

        <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="submit">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}