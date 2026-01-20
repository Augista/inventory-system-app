'use client';

import { useState } from 'react';
import { Pencil, Check, X, Package } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { toast } from 'sonner';
import type { StationeryItem } from '../page';

interface InventoryManagementProps {
  stationeryItems: StationeryItem[];
  onUpdateStock: (itemId: string, newStock: number) => void;
}

export default function InventoryManagement({ stationeryItems, onUpdateStock }: InventoryManagementProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleEdit = (item: StationeryItem) => {
    setEditingId(item.id);
    setEditValue(item.availableStock.toString());
  };

  const handleSave = (item: StationeryItem) => {
    const newStock = parseFloat(editValue);

    if (isNaN(newStock) || newStock < 0) {
      toast.error('Invalid Stock Value', {
        description: 'Please enter a valid positive number',
      });
      return;
    }

    if (newStock > item.totalStock) {
      toast.error('Stock Exceeds Total', {
        description: `Available stock cannot exceed total stock (${item.totalStock})`,
      });
      return;
    }

    onUpdateStock(item.id, newStock);
    toast.success('Stock Updated', {
      description: `${item.name} stock updated to ${newStock} ${item.unit}`,
    });

    setEditingId(null);
    setEditValue('');
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValue('');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <Package className="w-5 h-5 text-blue-600" />
        <p className="text-sm text-blue-900">
          Click the edit button to update the available stock for any item. Make sure the available stock does not exceed the total stock.
        </p>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold text-black">Item Name</TableHead>
              <TableHead className="font-semibold text-black">Category</TableHead>
              <TableHead className="font-semibold text-black text-right">Total Stock</TableHead>
              <TableHead className="font-semibold text-black text-right">Available Stock</TableHead>
              <TableHead className="font-semibold text-black">Unit</TableHead>
              <TableHead className="font-semibold text-black text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stationeryItems.map((item) => {
              const isEditing = editingId === item.id;
              const percentAvailable = (item.availableStock / item.totalStock) * 100;

              return (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      item.category === 'OP Stock' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-purple-100 text-purple-800'
                    }`}>
                      {item.category}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">{item.totalStock}</TableCell>
                  <TableCell className="text-right">
                    {isEditing ? (
                      <Input
                        type="number"
                        min="0"
                        max={item.totalStock}
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="w-24 h-8 text-right"
                        autoFocus
                      />
                    ) : (
                      <span className={`font-semibold ${
                        percentAvailable < 20 ? 'text-red-600' : 
                        percentAvailable < 50 ? 'text-orange-600' : 
                        'text-green-600'
                      }`}>
                        {item.availableStock}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell className="text-center">
                    {isEditing ? (
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleSave(item)}
                          className="h-8 w-8 p-0 bg-green-500"
                        >
                          <Check className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={handleCancel}
                          className="h-8 w-8 p-0 border-gray-300"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(item)}
                        className="h-8 px-3 border-gray-300"
                      >
                        <Pencil className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
