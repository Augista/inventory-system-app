// 'use client'

// import { useState } from 'react';
// import { StationeryItem } from '../page';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
// import { Button } from './ui/button';
// import { Input } from './ui/input';
// import { Label } from './ui/label';
// import { Textarea } from './ui/textarea';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from './ui/select';
// import { ArrowDownToLine, CheckCircle2, XCircle } from 'lucide-react';
// import { Alert, AlertDescription } from './ui/alert';

// interface BorrowFormProps {
//   items: StationeryItem[];
//   onBorrow: (itemId: string, quantity: number, notes?: string) => boolean;
// }

// export function BorrowForm({ items, onBorrow }: BorrowFormProps) {
//   const [selectedItemId, setSelectedItemId] = useState('');
//   const [quantity, setQuantity] = useState('');
//   const [notes, setNotes] = useState('');
//   const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

//   const selectedItem = items.find((item) => item.id === selectedItemId);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setMessage(null);

//     if (!selectedItemId || !quantity || !notes.trim()) {
//       setMessage({ type: 'error', text: 'Please fill in all required fields including notes.' });
//       return;
//     }

//     const qty = parseInt(quantity, 10);
//     if (isNaN(qty) || qty <= 0) {
//       setMessage({ type: 'error', text: 'Please enter a valid quantity.' });
//       return;
//     }

//     if (selectedItem && qty > selectedItem.stock) {
//       setMessage({
//         type: 'error',
//         text: `Cannot borrow ${qty} ${selectedItem.unit}. Only ${selectedItem.stock} ${selectedItem.unit} available in stock.`,
//       });

//       return;
//     }

//     const success = onBorrow(selectedItemId, qty, notes);

//     if (success) {
//       setMessage({
//         type: 'success',
//         text: `Successfully borrowed ${qty} ${selectedItem?.unit} of ${selectedItem?.name}.`,
//       });
//       setSelectedItemId('');
//       setQuantity('');
//       setNotes('');
//     } else {
//       setMessage({ type: 'error', text: 'Failed to process borrow request. Please try again.' });
//     }
//   };

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className="flex items-center text-orange-600">
//           <ArrowDownToLine className="w-5 h-5 mr-2" />
//           Borrow Stationery
//         </CardTitle>
//         <CardDescription>
//           Select items to borrow from the inventory. Stock will be automatically deducted.
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         {message && (
//           <Alert
//             variant={message.type === 'error' ? 'destructive' : 'default'}
//             className={message.type === 'success' ? 'border-green-500 bg-green-50' : ''}
//           >
//             {message.type === 'success' ? (
//               <CheckCircle2 className="h-4 w-4 text-green-600" />
//             ) : (
//               <XCircle className="h-4 w-4" />
//             )}
//             <AlertDescription className={message.type === 'success' ? 'text-green-800' : ''}>
//               {message.text}
//             </AlertDescription>
//           </Alert>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6 mt-4">
//           <div className="space-y-2">
//             <Label htmlFor="item">Select Item</Label>
//             <Select value={selectedItemId} onValueChange={setSelectedItemId}>
//               <SelectTrigger id="item">
//                 <SelectValue placeholder="Choose a stationery item" />
//               </SelectTrigger>
//               <SelectContent>
//                 {items.map((item) => (
//                   <SelectItem key={item.id} value={item.id}>
//                     {item.name} - {item.stock} {item.unit} available
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           {selectedItem && (
//             <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
//               <div className="grid grid-cols-2 gap-4 text-sm">
//                 <div>
//                   <p className="text-gray-600">Category</p>
//                   <p className="font-medium text-gray-900">{selectedItem.category}</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-600">Available Stock</p>
//                   <p className="font-medium text-orange-600">
//                     {selectedItem.stock} {selectedItem.unit}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           <div className="space-y-2">
//             <Label htmlFor="quantity">Quantity</Label>
//             <Input
//               id="quantity"
//               type="number"
//               min="1"
//               max={selectedItem?.stock || undefined}
//               placeholder="Enter quantity"
//               value={quantity}
//               onChange={(e) => setQuantity(e.target.value)}
//               required
//             />
//             {selectedItem && (
//               <p className="text-xs text-gray-500">
//                 Maximum: {selectedItem.stock} {selectedItem.unit}
//               </p>
//             )}
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="notes">Notes <span className="text-red-500">*</span></Label>
//             <Textarea
//               id="notes"
//               placeholder="Purpose or additional information..."
//               value={notes}
//               onChange={(e) => setNotes(e.target.value)}
//               rows={3}
//               required
//             />
//           </div>

//           <Button
//             type="submit"
//             className="w-full bg-orange-500 hover:bg-orange-600 text-white"
//             disabled={!selectedItemId || !quantity || !notes.trim()}
//           >
//             <ArrowDownToLine className="w-4 h-4 mr-2" />
//             Borrow Item
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//   );
// }
