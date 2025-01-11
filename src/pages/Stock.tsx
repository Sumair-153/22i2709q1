import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

// Hardcoded stock data with added color property
const initialStock = [
  { id: 1, name: "Laptop Pro", sku: "LAP001", quantity: 50, minStock: 10, color: "#9b87f5" },
  { id: 2, name: "Wireless Mouse", sku: "MOU001", quantity: 150, minStock: 30, color: "#7E69AB" },
  { id: 3, name: "Gaming Keyboard", sku: "KEY001", quantity: 75, minStock: 20, color: "#D6BCFA" },
  { id: 4, name: "4K Monitor", sku: "MON001", quantity: 25, minStock: 5, color: "#E5DEFF" },
  { id: 5, name: "USB-C Hub", sku: "USB001", quantity: 100, minStock: 15, color: "#8B5CF6" },
];

export default function Stock() {
  const [stock, setStock] = useState(initialStock);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const filteredStock = stock.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: number) => {
    setStock(stock.filter(item => item.id !== id));
    toast({
      title: "Item Deleted",
      description: "The stock item has been removed successfully.",
    });
  };

  const adjustQuantity = (id: number, amount: number) => {
    setStock(stock.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(0, item.quantity + amount);
        if (newQuantity <= item.minStock) {
          toast({
            title: "Low Stock Alert",
            description: `${item.name} is running low on stock!`,
            variant: "destructive",
          });
        }
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
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
              <TableHead>Color</TableHead>
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
                <TableCell>
                  <div 
                    className="w-6 h-6 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                </TableCell>
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
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => adjustQuantity(item.id, -1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => adjustQuantity(item.id, 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleDelete(item.id)}
                    >
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