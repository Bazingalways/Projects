"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatBotProps {
  playerName: string;
}

export function ChatBot({ playerName }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `Hi! I'm here to answer any questions about ${playerName}. What would you like to know?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, playerName }),
      });

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.message || "Sorry, I encountered an error.",
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="h-96">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          Ask about {playerName}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col h-80">
        <ScrollArea className="flex-1 pr-4">
          {messages.map((message, index) => (
            <div key={index} className="mb-4 flex items-start gap-2">
              {message.role === "user" ? (
                <User className="h-4 w-4 mt-1" />
              ) : (
                <Bot className="h-4 w-4 mt-1" />
              )}
              <div className="flex-1">
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4" />
              <p className="text-sm text-muted-foreground">Thinking...</p>
            </div>
          )}
        </ScrollArea>

        <div className="flex gap-2 mt-4">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about the player..."
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            disabled={loading}
          />
          <Button onClick={sendMessage} disabled={loading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
