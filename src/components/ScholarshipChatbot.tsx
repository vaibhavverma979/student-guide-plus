import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, X, Bot, User, Settings } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface ScholarshipChatbotProps {
  isOpen: boolean;
  onToggle: () => void;
}

const ScholarshipChatbot = ({ isOpen, onToggle }: ScholarshipChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your Scholarship AI assistant. I can help you find scholarships, understand eligibility requirements, and guide you through the application process. What would you like to know?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;
    
    if (!apiKey.trim()) {
      setShowSettings(true);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-small-128k-online',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful scholarship advisor AI. Help students find scholarships, understand eligibility requirements, and provide guidance on applications. Be concise and actionable in your responses.'
            },
            {
              role: 'user',
              content: inputMessage
            }
          ],
          temperature: 0.2,
          top_p: 0.9,
          max_tokens: 1000,
          return_images: false,
          return_related_questions: false,
          frequency_penalty: 1,
          presence_penalty: 0
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      const aiResponse = data.choices[0]?.message?.content || "I'm sorry, I couldn't process your request right now.";

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I encountered an error. Please check your API key and try again.",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={onToggle}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 bg-gradient-to-r from-secondary to-secondary-light hover:from-secondary-dark hover:to-secondary shadow-lg z-50"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </Button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[500px] z-50">
      <Card className="h-full flex flex-col shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-secondary to-secondary-light text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center text-lg">
              <Bot className="mr-2 h-5 w-5" />
              Scholarship AI
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSettings(!showSettings)}
                className="text-white hover:bg-white/20 p-1"
              >
                <Settings className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggle}
                className="text-white hover:bg-white/20 p-1"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {showSettings && (
          <div className="p-4 border-b bg-muted/50">
            <Label htmlFor="apiKey" className="text-sm font-medium">
              Perplexity API Key
            </Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="Enter your Perplexity API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="mt-1"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Get your API key from perplexity.ai
            </p>
          </div>
        )}

        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-primary text-white'
                        : 'bg-muted'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.sender === 'ai' && (
                        <Bot className="h-4 w-4 mt-0.5 text-secondary" />
                      )}
                      {message.sender === 'user' && (
                        <User className="h-4 w-4 mt-0.5 text-white" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'user' ? 'text-white/70' : 'text-muted-foreground'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4 text-secondary" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                placeholder="Ask about scholarships..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={sendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="bg-gradient-to-r from-secondary to-secondary-light hover:from-secondary-dark hover:to-secondary"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            {!apiKey && (
              <p className="text-xs text-muted-foreground mt-2">
                Click the settings icon to add your API key
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScholarshipChatbot;