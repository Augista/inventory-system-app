// 'use client';
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
// import { AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
// import { Alert, AlertDescription } from './ui/alert';

// interface LostItemsFormProps {
//   items: StationeryItem[];
//   onReportLost: (itemId: string, quantity: number, notes?: string) => boolean;
// }

// export function LostItemsForm({ items, onReportLost }: LostItemsFormProps) {
//   const [selectedItemId, setSelectedItemId] = useState('');
//   const [quantity, setQuantity] = useState('');
//   const [notes, setNotes] = useState('');
//   const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

//   const selectedItem = items.find((item) => item.id === selectedItemId);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setMessage(null);

//     if (!selectedItemId || !quantity) {
//       setMessage({ type: 'error', text: 'Please select an item and enter quantity.' });
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
//         text: `Cannot report ${qty} ${selectedItem.unit} as lost. Only ${selectedItem.stock} ${selectedItem.unit} available in stock.`,
//       });
//       return;
//     }

//     if (!notes.trim()) {
//       setMessage({ type: 'error', text: 'Please provide details about the lost items.' });
//       return;
//     }

//     const success = onReportLost(selectedItemId, qty, notes);

//     if (success) {
//       setMessage({
//         type: 'success',
//         text: `Successfully reported ${qty} ${selectedItem?.unit} of ${selectedItem?.name} as lost. Stock has been updated.`,
//       });
//       setSelectedItemId('');
//       setQuantity('');
//       setNotes('');
//     } else {
//       setMessage({ type: 'error', text: 'Failed to report lost items. Please try again.' });
//     }
//   };

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className="flex items-center text-red-600">
//           <AlertTriangle className="w-5 h-5 mr-2" />
//           Report Lost Items
//         </CardTitle>
//         <CardDescription>
//           Record items that have been lost or damaged. Stock will be automatically deducted.
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
//             <div className="p-4 bg-red-50 rounded-lg border border-red-200">
//               <div className="grid grid-cols-2 gap-4 text-sm">
//                 <div>
//                   <p className="text-gray-600">Category</p>
//                   <p className="font-medium text-gray-900">{selectedItem.category}</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-600">Current Stock</p>
//                   <p className="font-medium text-red-600">
//                     {selectedItem.stock} {selectedItem.unit}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           <div className="space-y-2">
//             <Label htmlFor="quantity">Quantity Lost</Label>
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
//             <Label htmlFor="notes">Details / Circumstances</Label>
//             <Textarea
//               id="notes"
//               placeholder="Describe how the items were lost or damaged..."
//               value={notes}
//               onChange={(e) => setNotes(e.target.value)}
//               rows={4}
//               required
//             />
//             <p className="text-xs text-gray-500">
//               Please provide detailed information about the incident
//             </p>
//           </div>

//           <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-300">
//             <p className="text-sm text-yellow-800">
//               ⚠️ Warning: Reporting items as lost will permanently deduct them from the inventory.
//             </p>
//           </div>

//           <Button
//             type="submit"
//             className="w-full bg-red-500 hover:bg-red-600 text-white"
//             disabled={!selectedItemId || !quantity || !notes.trim()}
//           >
//             <AlertTriangle className="w-4 h-4 mr-2" />
//             Report as Lost
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//   );
// }
