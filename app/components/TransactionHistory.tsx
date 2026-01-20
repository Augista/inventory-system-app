// import { Transaction } from '../page';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
// import { Badge } from './ui/badge';
// import { History, ArrowDownToLine, ArrowUpFromLine, ShoppingCart, AlertTriangle, Database } from 'lucide-react';
// import { format } from 'date-fns';

// interface TransactionHistoryProps {
//   transactions: Transaction[];
//   showUser: boolean;
// }

// export function TransactionHistory({ transactions, showUser }: TransactionHistoryProps) {
//   const getTransactionIcon = (type: Transaction['type']) => {
//     switch (type) {
//       case 'borrow':
//         return <ArrowDownToLine className="w-4 h-4" />;
//       case 'return':
//         return <ArrowUpFromLine className="w-4 h-4" />;
//       case 'pre-order':
//         return <ShoppingCart className="w-4 h-4" />;
//       case 'lost':
//         return <AlertTriangle className="w-4 h-4" />;
//       case 'stock-update':
//         return <Database className="w-4 h-4" />;
//     }
//   };

//   const getTransactionColor = (type: Transaction['type']) => {
//     switch (type) {
//       case 'borrow':
//         return 'bg-orange-100 text-orange-800';
//       case 'return':
//         return 'bg-blue-100 text-blue-800';
//       case 'pre-order':
//         return 'bg-purple-100 text-purple-800';
//       case 'lost':
//         return 'bg-red-100 text-red-800';
//       case 'stock-update':
//         return 'bg-green-100 text-green-800';
//     }
//   };

//   const getStatusBadge = (status: Transaction['status']) => {
//     switch (status) {
//       case 'completed':
//         return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
//       case 'pending':
//         return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
//       case 'approved':
//         return <Badge className="bg-blue-100 text-blue-800">Approved</Badge>;
//     }
//   };

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle className="flex items-center">
//           <History className="w-5 h-5 mr-2" />
//           Transaction History
//         </CardTitle>
//         <CardDescription>
//           {showUser ? 'All transactions across the system' : 'Your transaction history'}
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         {transactions.length === 0 ? (
//           <div className="text-center py-12">
//             <History className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//             <p className="text-gray-500">No transactions yet</p>
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {transactions.map((transaction) => (
//               <div
//                 key={transaction.id}
//                 className="p-4 border rounded-lg hover:shadow-md transition-shadow"
//               >
//                 <div className="flex items-start justify-between mb-2">
//                   <div className="flex items-start space-x-3 flex-1">
//                     <div className={`p-2 rounded-lg ${getTransactionColor(transaction.type)}`}>
//                       {getTransactionIcon(transaction.type)}
//                     </div>
//                     <div className="flex-1">
//                       <h4 className="font-medium text-gray-900">{transaction.itemName}</h4>
//                       <div className="flex items-center space-x-2 mt-1">
//                         <Badge variant="outline" className="text-xs">
//                           {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
//                         </Badge>
//                         {getStatusBadge(transaction.status)}
//                       </div>
//                     </div>
//                   </div>
//                   <div className="text-right">
//                     <p className="font-semibold text-gray-900">
//                       {transaction.type === 'stock-update' ? '' : transaction.type === 'return' ? '+' : '-'}
//                       {transaction.quantity}
//                     </p>
//                     <p className="text-xs text-gray-500">
//                       {format(new Date(transaction.date), 'MMM dd, yyyy')}
//                     </p>
//                     <p className="text-xs text-gray-500">
//                       {format(new Date(transaction.date), 'HH:mm')}
//                     </p>
//                   </div>
//                 </div>
//                 {showUser && (
//                   <p className="text-sm text-gray-600 mt-2">
//                     <span className="font-medium">User:</span> {transaction.user}
//                   </p>
//                 )}
//                 {transaction.notes && (
//                   <p className="text-sm text-gray-600 mt-2 bg-gray-50 p-2 rounded">
//                     <span className="font-medium">Notes:</span> {transaction.notes}
//                   </p>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// }
