import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";

// Hardcoded orders data
const orders = [
  { id: 1, customer: "John Doe", date: "2024-03-10", status: "Pending", total: 299.99 },
  { id: 2, customer: "Jane Smith", date: "2024-03-09", status: "Completed", total: 199.99 },
  { id: 3, customer: "Bob Johnson", date: "2024-03-08", status: "Processing", total: 399.99 },
  { id: 4, customer: "Alice Brown", date: "2024-03-07", status: "Pending", total: 149.99 },
  { id: 5, customer: "Charlie Wilson", date: "2024-03-06", status: "Completed", total: 599.99 },
];

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders = orders.filter(order => 
    (order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
     order.status.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (statusFilter === "all" || order.status === statusFilter)
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Orders</h1>
        <div className="flex gap-4">
          <Input
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-[300px]"
          />
          <select
            className="border rounded-md px-3"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      <Card className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>#{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {order.status}
                  </span>
                </TableCell>
                <TableCell>${order.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}