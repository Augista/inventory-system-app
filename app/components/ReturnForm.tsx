// 'useclient'
// import { useState, useMemo } from 'react';
// import { StationeryItem, Transaction } from '../page';
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
// import { ArrowUpFromLine, CheckCircle2, XCircle } from 'lucide-react';
// import { Alert, AlertDescription } from './ui/alert';

// interface ReturnFormProps {
//   items: StationeryItem[];
//   userEmail: string;
//   transactions: Transaction[];
//   onReturn: (itemId: string, quantity: number, notes?: string) => boolean;
// }

// export function ReturnForm({ items, userEmail, transactions, onReturn }: ReturnFormProps) {
//   const [selectedItemId, setSelectedItemId] = useState('');
//   const [quantity, setQuantity] = useState('');
//   const [notes, setNotes] = useState('');
//   const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

//   // Calculate borrowed items for this user (borrow - return)
//   const borrowedItems = useMemo(() => {
//     const itemMap = new Map<string, { name: string; borrowed: number; unit: string }>();

//     // Filter transactions for this user
//     const userTransactions = transactions.filter(t => t.user === userEmail);

//     userTransactions.forEach(t => {
//       if (t.type === 'borrow' && t.status === 'completed') {
//         const existing = itemMap.get(t.itemId) || { name: t.itemName, borrowed: 0, unit: '' };
//         const item = items.find(i => i.id === t.itemId);
//         itemMap.set(t.itemId, {
//           name: t.itemName,
//           borrowed: existing.borrowed + t.quantity,
//           unit: item?.unit || ''
//         });
//       } else if (t.type === 'return' && t.status === 'completed') {
//         const existing = itemMap.get(t.itemId);
//         if (existing) {
//           itemMap.set(t.itemId, {
//             ...existing,
//             borrowed: existing.borrowed - t.quantity
//           });
//         }
//       }
//     });

//     // Filter out items with 0 or negative borrowed quantity
//     const result: Array<{ id: string; name: string; borrowed: number; unit: string }> = [];
//     itemMap.forEach((value, key) => {
//       if (value.borrowed > 0) {
//         result.push({ id: key, ...value });
//       }
//     });

//     return result;
//   }, [items, userEmail, transactions]);

//   const selectedBorrowedItem = borrowedItems.find(item => item.id === selectedItemId);
//   const selectedItem = items.find(item => item.id === selectedItemId);

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

//     if (selectedBorrowedItem && qty > selectedBorrowedItem.borrowed) {
//       setMessage({
//         type: 'error',
//         text: `Cannot return ${qty} ${selectedBorrowedItem.unit}. You only borrowed ${selectedBorrowedItem.borrowed} ${selectedBorrowedItem.unit}.`,
//       });
//       return;
//     }

//     const success = onReturn(selectedItemId, qty, notes);

//     if (success) {
//       setMessage({
//         type: 'success',
//         text: `Successfully returned ${qty} ${selectedBorrowedItem?.unit} of ${selectedBorrowedItem?.name}.`,
//       });
//       setSelectedItemId('');
//       setQuantity('');
//       setNotes('');
//     } else {
//       setMessage({ type: 'error', text: 'Failed to process return. Please try again.' });
//     }
//   };

//   if (borrowedItems.length === 0) {
//     return (
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center text-blue-600">
//             <ArrowUpFromLine className="w-5 h-5 mr-2" />
//             Return Stationery
//           </CardTitle>
//           <CardDescription>
//             Return borrowed items to the inventory. Stock will be automatically restored.
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Alert className="border-blue-500 bg-blue-50">
//             <AlertDescription className="text-blue-800">
//               You don't have any borrowed items to return at the moment.
//             </AlertDescription>
//           </Alert>
//         </CardContent>
//       </Card>
//     );
//   }

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className="flex items-center text-blue-600">
//           <ArrowUpFromLine className="w-5 h-5 mr-2" />
//           Return Stationery
//         </CardTitle>
//         <CardDescription>
//           Return borrowed items to the inventory. Stock will be automatically restored.
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
//             <Label htmlFor="item">Select Item to Return</Label>
//             <Select value={selectedItemId} onValueChange={setSelectedItemId}>
//               <SelectTrigger id="item">
//                 <SelectValue placeholder="Choose an item you borrowed" />
//               </SelectTrigger>
//               <SelectContent>
//                 {borrowedItems.map((item) => (
//                   <SelectItem key={item.id} value={item.id}>
//                     {item.name} - {item.borrowed} {item.unit} borrowed
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           {selectedItem && selectedBorrowedItem && (
//             <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
//               <div className="grid grid-cols-2 gap-4 text-sm">
//                 <div>
//                   <p className="text-gray-600">Category</p>
//                   <p className="font-medium text-gray-900">{selectedItem.category}</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-600">Borrowed Quantity</p>
//                   <p className="font-medium text-blue-600">
//                     {selectedBorrowedItem.borrowed} {selectedBorrowedItem.unit}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           <div className="space-y-2">
//             <Label htmlFor="quantity">Quantity to Return</Label>
//             <Input
//               id="quantity"
//               type="number"
//               min="1"
//               max={selectedBorrowedItem?.borrowed || undefined}
//               placeholder="Enter quantity"
//               value={quantity}
//               onChange={(e) => setQuantity(e.target.value)}
//               required
//             />
//             {selectedBorrowedItem && (
//               <p className="text-xs text-gray-500">
//                 Maximum: {selectedBorrowedItem.borrowed} {selectedBorrowedItem.unit}
//               </p>
//             )}
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="notes">Notes <span className="text-red-500">*</span></Label>
//             <Textarea
//               id="notes"
//               placeholder="Condition or additional information..."
//               value={notes}
//               onChange={(e) => setNotes(e.target.value)}
//               rows={3}
//               required
//             />
//           </div>

//           <Button
//             type="submit"
//             className="w-full bg-blue-500 hover:bg-blue-600 text-white"
//             disabled={!selectedItemId || !quantity || !notes.trim()}
//           >
//             <ArrowUpFromLine className="w-4 h-4 mr-2" />
//             Return Item
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//   );
// }
