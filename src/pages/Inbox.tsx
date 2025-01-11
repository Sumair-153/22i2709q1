import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Search, ArrowLeft } from "lucide-react";
import { useState } from "react";

// Hardcoded messages data with conversation history
const messages = [
  {
    id: 1,
    from: "Supplier A",
    subject: "Stock Update",
    date: "2024-03-10",
    read: false,
    conversation: [
      { sender: "Supplier A", message: "Hello, we have new stock available for your store.", timestamp: "10:00 AM" },
      { sender: "Me", message: "Great! What items are available?", timestamp: "10:15 AM" },
      { sender: "Supplier A", message: "We have laptops and monitors in stock now.", timestamp: "10:30 AM" }
    ]
  },
  {
    id: 2,
    from: "Supplier B",
    subject: "Price Changes",
    date: "2024-03-09",
    read: true,
    conversation: [
      { sender: "Supplier B", message: "We need to discuss the new pricing structure.", timestamp: "2:00 PM" },
      { sender: "Me", message: "Sure, what are the changes?", timestamp: "2:30 PM" }
    ]
  },
  {
    id: 3,
    from: "Supplier C",
    subject: "New Products",
    date: "2024-03-08",
    read: true,
    conversation: [
      { sender: "Supplier C", message: "Check out our new product line!", timestamp: "11:00 AM" }
    ]
  }
];

export default function Inbox() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const filteredMessages = messages.filter(message =>
    message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.from.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedConversation = messages.find(m => m.id === selectedMessage);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inbox</h1>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[300px] pl-9"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {!selectedMessage ? (
          // Messages List View
          <Card className="p-4">
            <div className="space-y-2">
              {filteredMessages.map((message) => (
                <div
                  key={message.id}
                  className={`p-3 rounded-lg cursor-pointer ${
                    !message.read ? 'bg-muted/50 font-semibold' : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedMessage(message.id)}
                >
                  <div className="flex justify-between">
                    <span>{message.from}</span>
                    <span className="text-sm text-muted-foreground">{message.date}</span>
                  </div>
                  <div className="text-sm text-muted-foreground truncate">
                    {message.subject}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ) : (
          // Chat View
          <Card className="p-6">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedMessage(null)}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                  <h2 className="text-xl font-semibold">
                    {selectedConversation?.subject}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    From: {selectedConversation?.from}
                  </p>
                </div>
              </div>

              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {selectedConversation?.conversation.map((msg, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg ${
                      msg.sender === "Me"
                        ? "bg-primary text-primary-foreground ml-auto"
                        : "bg-muted"
                    } max-w-[80%] ${msg.sender === "Me" ? "ml-auto" : "mr-auto"}`}
                  >
                    <div className="text-sm font-semibold mb-1">{msg.sender}</div>
                    <div>{msg.message}</div>
                    <div className="text-xs opacity-70 mt-1">{msg.timestamp}</div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <Textarea
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="min-h-[100px]"
                />
                <div className="flex justify-end">
                  <Button onClick={() => {
                    // Here you would typically handle sending the message
                    setNewMessage("");
                  }}>
                    Send Message
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}