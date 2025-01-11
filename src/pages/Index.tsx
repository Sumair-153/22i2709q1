import { Users, DollarSign, ShoppingBag, Package } from "lucide-react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { SalesChart } from "@/components/dashboard/SalesChart";

const Index = () => {
  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Users"
          value="1,234"
          icon={<Users className="h-4 w-4" />}
          trend={{ value: 12, isPositive: true }}
        />
        <MetricCard
          title="Total Sales"
          value="$45,231"
          icon={<DollarSign className="h-4 w-4" />}
          trend={{ value: 8, isPositive: true }}
        />
        <MetricCard
          title="Pending Orders"
          value="23"
          icon={<ShoppingBag className="h-4 w-4" />}
          trend={{ value: 5, isPositive: false }}
        />
        <MetricCard
          title="Total Products"
          value="156"
          icon={<Package className="h-4 w-4" />}
          trend={{ value: 3, isPositive: true }}
        />
      </div>

      <div className="mt-8">
        <SalesChart />
      </div>
    </div>
  );
};

export default Index;