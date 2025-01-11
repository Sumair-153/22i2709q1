import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Search } from "lucide-react";
import { useState } from "react";

// Hardcoded messages data
const messages = [
  { id: 1, from: "Supplier A", subject: "Stock Update", date: "2024-03-10", read: false },
  { id: 2, from: "Supplier B", subject: "Price Changes", date: "2024-03-09", read: true },
  { id: 3, from: "Supplier C", subject: "New Products", date: "2024-03-08", read: true },
  { id: 4, from: "Supplier D", subject: "Delivery Delay", date: "2024-03-07", read: false },
  { id: 5, from: "Supplier E", subject: "Restocking Request", date: "2024-03-06", read: true },
];

export default function Inbox() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const filteredMessages = messages.filter(message =>
    message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.from.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inbox</h1>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-[300px] pl-9"
            />
          </div>
          <Button>New Message</Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <Card className="col-span-4 p-4">
          <div className="space-y-2">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                className={`p-3 rounded-lg cursor-pointer ${
                  selectedMessage === message.id ? 'bg-muted' : 'hover:bg-muted/50'
                } ${!message.read ? 'font-semibold' : ''}`}
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

        <Card className="col-span-8 p-6">
          {selectedMessage ? (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  {messages.find(m => m.id === selectedMessage)?.subject}
                </h2>
                <p className="text-sm text-muted-foreground">
                  From: {messages.find(m => m.id === selectedMessage)?.from}
                </p>
              </div>
              <div className="space-y-4">
                <Textarea
                  placeholder="Type your reply..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="min-h-[200px]"
                />
                <div className="flex justify-end">
                  <Button>Send Reply</Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              Select a message to view
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}