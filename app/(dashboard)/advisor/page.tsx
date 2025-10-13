'use client'

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AdvisorPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) throw new Error('API request failed');

      const data = await response.json();
      const assistantMessage: Message = { role: 'assistant', content: data.reply };
      setMessages([...newMessages, assistantMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = { role: 'assistant', content: "Sorry, I'm having trouble connecting. Please try again." };
      setMessages([...newMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  // The main layout is simplified to work within the parent <main> tag
  return (
    <div className="h-full max-h-[calc(100vh-80px)] flex flex-col">
      <h1 className="text-3xl font-bold mb-4 shrink-0">AI Financial Advisor</h1>
      <Card className="flex-1 flex flex-col">
        <CardContent className="flex-1 flex flex-col p-4 overflow-hidden">
          <div className="flex-1 space-y-4 overflow-y-auto pr-4">
            {messages.map((msg, index) => (
              <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                {msg.role === 'assistant' && <Avatar><AvatarFallback>AI</AvatarFallback></Avatar>}
                <div className={`p-3 rounded-lg max-w-lg ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                  <p style={{ whiteSpace: 'pre-wrap' }}>{msg.content}</p>
                </div>
                {msg.role === 'user' && <Avatar><AvatarFallback>You</AvatarFallback></Avatar>}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="mt-4 flex gap-2 shrink-0">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !loading && handleSend()}
              placeholder="Ask a financial question..."
              disabled={loading}
              className="flex-1"
            />
            <Button onClick={handleSend} disabled={loading}>
              {loading ? 'Thinking...' : 'Send'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}