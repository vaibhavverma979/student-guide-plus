import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Send, Bot, User, Sparkles, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";

interface ChatMessage {
  id: number;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
}

const AICareerChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      type: "ai",
      content: "Hello! I'm your AI Career Advisor. I'm here to help you discover career paths that align with your interests, skills, and goals. What would you like to explore today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    "What career options are available in technology?",
    "I'm interested in healthcare. What should I study?",
    "What skills do I need for a career in finance?",
    "Tell me about creative career paths",
    "What are the highest paying careers right now?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      id: messages.length + 1,
      type: "user",
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: messages.length + 2,
        type: "ai",
        content: generateAIResponse(message),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userMessage: string): string => {
    // Mock AI responses based on keywords
    const msg = userMessage.toLowerCase();
    
    if (msg.includes("technology") || msg.includes("tech")) {
      return "Great choice! Technology offers diverse career paths:\n\n• Software Development - Build applications and systems\n• Data Science - Analyze data to drive decisions\n• Cybersecurity - Protect digital assets\n• AI/ML Engineering - Create intelligent systems\n• UX/UI Design - Design user experiences\n\nEach path has different educational requirements. Which area interests you most?";
    }
    
    if (msg.includes("healthcare") || msg.includes("medical")) {
      return "Healthcare is a rewarding field with many opportunities:\n\n• Medicine (MBBS) - Become a doctor\n• Nursing - Direct patient care\n• Pharmacy - Medication expertise\n• Physiotherapy - Rehabilitation therapy\n• Medical Research - Advance medical knowledge\n\nMost healthcare careers require specific degrees and licensing. What aspect of healthcare appeals to you?";
    }
    
    if (msg.includes("finance") || msg.includes("banking")) {
      return "Finance offers excellent career prospects:\n\n• Investment Banking - Deal with mergers and acquisitions\n• Financial Planning - Help clients manage wealth\n• Accounting - Manage financial records\n• Risk Management - Assess and mitigate risks\n• Corporate Finance - Manage company finances\n\nKey skills include analytical thinking, attention to detail, and strong math abilities. Would you like to know about specific educational paths?";
    }
    
    return "That's an interesting question! Based on your interests, I'd recommend exploring these steps:\n\n1. Assess your strengths and interests\n2. Research educational requirements\n3. Look into job market trends\n4. Consider speaking with professionals in the field\n5. Explore internship opportunities\n\nWould you like me to help you dive deeper into any specific area?";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-primary-light text-white py-6">
        <div className="section-container">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/student/dashboard">
                <Button variant="ghost" className="text-white hover:bg-white/20">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold flex items-center">
                  <Bot className="mr-2 h-6 w-6" />
                  Career Path AI
                </h1>
                <p className="text-white/90">Get personalized career guidance powered by AI</p>
              </div>
            </div>
            <Badge className="bg-white/20 text-white">
              <Sparkles className="mr-1 h-3 w-3" />
              AI Powered
            </Badge>
          </div>
        </div>
      </div>

      <div className="section-container py-6">
        <div className="max-w-4xl mx-auto">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="flex-shrink-0">
              <CardTitle className="flex items-center">
                <Lightbulb className="mr-2 h-5 w-5 text-accent" />
                AI Career Conversation
              </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-4 ${
                        message.type === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {message.type === "ai" && (
                          <Bot className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                        )}
                        {message.type === "user" && (
                          <User className="h-4 w-4 mt-0.5 text-primary-foreground flex-shrink-0" />
                        )}
                        <div className="whitespace-pre-wrap">{message.content}</div>
                      </div>
                      <div className="text-xs opacity-70 mt-2">
                        {message.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg p-4 max-w-[80%]">
                      <div className="flex items-center space-x-2">
                        <Bot className="h-4 w-4 text-primary" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggested Questions */}
              {messages.length <= 1 && (
                <div className="px-6 pb-4">
                  <p className="text-sm text-muted-foreground mb-3">Suggested questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSendMessage(question)}
                        className="text-xs"
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="border-t p-6 flex-shrink-0">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage(inputMessage);
                  }}
                  className="flex space-x-2"
                >
                  <Input
                    placeholder="Ask about career paths, education requirements, skills needed..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="flex-1"
                    disabled={isTyping}
                  />
                  <Button 
                    type="submit" 
                    disabled={!inputMessage.trim() || isTyping}
                    className="btn-gradient"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AICareerChat;