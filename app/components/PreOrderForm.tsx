// 'useclient'
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
// import { ShoppingCart, CheckCircle2, XCircle } from 'lucide-react';
// import { Alert, AlertDescription } from './ui/alert';

// interface PreOrderFormProps {
//   items: StationeryItem[];
//   onPreOrder: (itemId: string, quantity: number, notes?: string) => boolean;
// }

// export function PreOrderForm({ items, onPreOrder }: PreOrderFormProps) {
//   const [selectedItemId, setSelectedItemId] = useState('');
//   const [quantity, setQuantity] = useState('');
//   const [notes, setNotes] = useState('');
//   const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

//   const selectedItem = items.find((item) => item.id === selectedItemId);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setMessage(null);

//     if (!selectedItemId || !quantity || !notes.trim()) {
//       setMessage({ type: 'error', text: 'Please fill in all required fields including purpose/justification.' });
//       return;
//     }

//     const qty = parseInt(quantity, 10);
//     if (isNaN(qty) || qty <= 0) {
//       setMessage({ type: 'error', text: 'Please enter a valid quantity.' });
//       return;
//     }

//     const success = onPreOrder(selectedItemId, qty, notes);

//     if (success) {
//       setMessage({
//         type: 'success',
//         text: `Pre-order request submitted for ${qty} ${selectedItem?.unit} of ${selectedItem?.name}. Awaiting approval.`,
//       });
//       setSelectedItemId('');
//       setQuantity('');
//       setNotes('');
//     } else {
//       setMessage({ type: 'error', text: 'Failed to submit pre-order. Please try again.' });
//     }
//   };

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className="flex items-center text-purple-600">
//           <ShoppingCart className="w-5 h-5 mr-2" />
//           Pre-Order Stationery
//         </CardTitle>
//         <CardDescription>
//           Submit a pre-order request for items. Staff will review and approve your request.
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
//                     {item.name}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           {selectedItem && (
//             <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
//               <div className="grid grid-cols-2 gap-4 text-sm">
//                 <div>
//                   <p className="text-gray-600">Category</p>
//                   <p className="font-medium text-gray-900">{selectedItem.category}</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-600">Current Stock</p>
//                   <p className="font-medium text-purple-600">
//                     {selectedItem.stock} {selectedItem.unit}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}

//           <div className="space-y-2">
//             <Label htmlFor="quantity">Quantity Needed</Label>
//             <Input
//               id="quantity"
//               type="number"
//               min="1"
//               placeholder="Enter quantity"
//               value={quantity}
//               onChange={(e) => setQuantity(e.target.value)}
//               required
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="notes">Purpose / Justification</Label>
//             <Textarea
//               id="notes"
//               placeholder="Explain why you need this item..."
//               value={notes}
//               onChange={(e) => setNotes(e.target.value)}
//               rows={4}
//               required
//             />
//             <p className="text-xs text-gray-500">
//               Please provide details about when and why you need this item
//             </p>
//           </div>

//           <Button
//             type="submit"
//             className="w-full bg-purple-500 hover:bg-purple-600 text-white"
//             disabled={!selectedItemId || !quantity || !notes.trim()}
//           >
//             <ShoppingCart className="w-4 h-4 mr-2" />
//             Submit Pre-Order Request
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//   );
// }
