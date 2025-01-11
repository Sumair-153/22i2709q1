import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, Plus, Minus } from "lucide-react";
import { useState } from "react";

// Hardcoded stock data
const initialStock = [
  { id: 1, name: "Laptop Pro", sku: "LAP001", quantity: 50, minStock: 10 },
  { id: 2, name: "Wireless Mouse", sku: "MOU001", quantity: 150, minStock: 30 },
  { id: 3, name: "Gaming Keyboard", sku: "KEY001", quantity: 75, minStock: 20 },
  { id: 4, name: "4K Monitor", sku: "MON001", quantity: 25, minStock: 5 },
  { id: 5, name: "USB-C Hub", sku: "USB001", quantity: 100, minStock: 15 },
];

export default function Stock() {
  const [stock, setStock] = useState(initialStock);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStock = stock.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: number) => {
    setStock(stock.filter(item => item.id !== id));
  };

  const adjustQuantity = (id: number, amount: number) => {
    setStock(stock.map(item =>
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity + amount) } : item
    ));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Stock Management</h1>
        <div className="flex gap-4">
          <Input
            placeholder="Search inventory..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[300px]"
          />
          <Button>Add New Item</Button>
        </div>
      </div>

      <Card className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStock.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.sku}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    item.quantity <= item.minStock ? 'bg-red-100 text-red-800' :
                    item.quantity <= item.minStock * 2 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {item.quantity <= item.minStock ? 'Low Stock' :
                     item.quantity <= item.minStock * 2 ? 'Medium Stock' :
                     'In Stock'}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => adjustQuantity(item.id, -1)}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => adjustQuantity(item.id, 1)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}