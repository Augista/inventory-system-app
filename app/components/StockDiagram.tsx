"use client";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { StationeryItem } from "../page";

interface StockDiagramProps {
  stationeryItems: StationeryItem[];
}

export default function StockDiagram({ stationeryItems }: StockDiagramProps) {
  const opStockItems = stationeryItems.filter((i) => i.category === "OP Stock");
  const opNonStockItems = stationeryItems.filter(
    (i) => i.category === "OP Non-Stock",
  );

  const categoryData = [
    {
      name: "OP Stock",
      value: opStockItems.reduce((sum, item) => sum + item.availableStock, 0),
      count: opStockItems.length,
      color: "#3b82f6",
    },
    {
      name: "OP Non-Stock",
      value: opNonStockItems.reduce(
        (sum, item) => sum + item.availableStock,
        0,
      ),
      count: opNonStockItems.length,
      color: "#a855f7",
    },
  ];

  const topItemsData = [...stationeryItems]
    .sort((a, b) => b.availableStock - a.availableStock)
    .slice(0, 8)
    .map((item) => ({
      name: item.name.length > 20 ? item.name.slice(0, 20) + "..." : item.name,
      stock: item.availableStock,
    }));

  return (
    <div className="space-y-8">
      {/* Pie Chart */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">
          Stock Distribution by Category
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, percent }: { name?: string; percent?: number }) =>
                `${name ?? ""}: ${((percent ?? 0) * 100).toFixed(0)}%`
              }
            >
              {categoryData.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>

            <Tooltip
              formatter={(value: number | undefined) => [
                `${value ?? 0} units`,
                "Total Stock",
              ]}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="mt-6 grid grid-cols-2 gap-4">
          {categoryData.map((category, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
            >
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: category.color }}
              />
              <div>
                <p className="font-semibold text-sm text-gray-900">
                  {category.name}
                </p>
                <p className="text-xs text-gray-600">
                  {category.value} units • {category.count} items
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 text-center">
          Top Items by Available Stock
        </h3>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={topItemsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              angle={-45}
              textAnchor="end"
              height={100}
              interval={0}
              fontSize={11}
            />
            <YAxis />
            <Tooltip
              formatter={(value: number | undefined) => [
                `${value ?? 0} units`,
                "Available Stock",
              ]}
            />
            <Legend />
            <Bar
              dataKey="stock"
              name="Available Stock"
              fill="#f97316"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <p className="text-sm font-medium text-blue-900">OP Stock</p>
          <p className="text-3xl font-bold text-blue-700 mt-2">
            {opStockItems.length}
          </p>
          <p className="text-sm text-blue-600 mt-1">
            {opStockItems.reduce((s, i) => s + i.availableStock, 0)} units
          </p>
        </div>

        <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
          <p className="text-sm font-medium text-purple-900">OP Non-Stock</p>
          <p className="text-3xl font-bold text-purple-700 mt-2">
            {opNonStockItems.length}
          </p>
          <p className="text-sm text-purple-600 mt-1">
            {opNonStockItems.reduce((s, i) => s + i.availableStock, 0)} units
          </p>
        </div>

        <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
          <p className="text-sm font-medium text-orange-900">Total Inventory</p>
          <p className="text-3xl font-bold text-orange-700 mt-2">
            {stationeryItems.length}
          </p>
          <p className="text-sm text-orange-600 mt-1">
            {stationeryItems.reduce((s, i) => s + i.availableStock, 0)} units
          </p>
        </div>
      </div>
    </div>
  );
}
