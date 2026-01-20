"use client";

import { useState } from "react";
import type { StationeryItem } from "../page";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Database, Edit, Plus, CheckCircle2 } from "lucide-react";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";

interface StockManagementProps {
  items: StationeryItem[];
  onUpdateStock: (itemId: string, newStock: number, notes?: string) => void;
  onAddItem: Omit<StationeryItem, "id" | "lastUpdated"> extends infer T
    ? (item: T) => void
    : never;
}

export function StockManagement({
  items,
  onUpdateStock,
  onAddItem,
}: StockManagementProps) {
  const [editingItem, setEditingItem] = useState<StationeryItem | null>(null);
  const [newStock, setNewStock] = useState("");
  const [notes, setNotes] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const [newItemName, setNewItemName] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("");
  const [newItemStock, setNewItemStock] = useState("");
  const [newItemUnit, setNewItemUnit] = useState("");

  const handleUpdateStock = () => {
    if (!editingItem) return;

    const stock = Number(newStock);
    if (Number.isNaN(stock) || stock < 0) return;

    onUpdateStock(editingItem.id, stock, notes || undefined);

    setEditingItem(null);
    setNewStock("");
    setNotes("");
    setMessage("Stock updated successfully!");
    setTimeout(() => setMessage(null), 3000);
  };

  const handleAddItem = () => {
    const stock = Number(newItemStock);
    if (!newItemName || !newItemCategory || !newItemUnit || stock < 0) return;

    const validCategory = newItemCategory as "OP Stock" | "OP Non-Stock";

    onAddItem({
      name: newItemName,
      category: validCategory,
      totalStock: stock,
      availableStock: stock,
      unit: newItemUnit,
    });

    setNewItemName("");
    setNewItemCategory("");
    setNewItemStock("");
    setNewItemUnit("");
    setIsAddDialogOpen(false);

    setMessage("New item added successfully!");
    setTimeout(() => setMessage(null), 3000);
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0)
      return { label: "Out of Stock", color: "bg-red-100 text-red-800" };
    if (stock < 20)
      return { label: "Critical", color: "bg-red-100 text-red-800" };
    if (stock < 50)
      return { label: "Low Stock", color: "bg-yellow-100 text-yellow-800" };
    return { label: "In Stock", color: "bg-green-100 text-green-800" };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Database className="w-5 h-5 mr-2" />
          Stock Management
        </CardTitle>
        <CardDescription>
          Update stock levels and add new items to the inventory
        </CardDescription>
      </CardHeader>

      <CardContent>
        {message && (
          <Alert className="mb-4 border-green-500 bg-green-50">
            <CheckCircle2 className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              {message}
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          {items.map((item) => {
            const status = getStockStatus(item.availableStock);

            return (
              <div key={item.id} className="p-4 border rounded-lg">
                <div className="flex justify-between">
                  <div>
                    <div className="flex gap-2 mb-2">
                      <h4 className="font-medium">{item.name}</h4>
                      <Badge className={status.color}>{status.label}</Badge>
                    </div>
                    <p className="text-sm text-gray-600">
                      {item.availableStock} {item.unit}
                    </p>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingItem(item);
                          setNewStock(item.availableStock.toString());
                        }}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Update
                      </Button>
                    </DialogTrigger>

                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Update Stock</DialogTitle>
                        <DialogDescription>
                          Adjust stock for {item.name}
                        </DialogDescription>
                      </DialogHeader>

                      <Input
                        type="number"
                        min={0}
                        value={newStock}
                        onChange={(e) => setNewStock(e.target.value)}
                      />

                      <Textarea
                        placeholder="Notes (optional)"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      />

                      <Button onClick={handleUpdateStock}>Update Stock</Button>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
