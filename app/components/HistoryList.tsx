import { Calendar, Package, User, FileText } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import type { RetrievalOrder } from '../page';

interface HistoryListProps {
  retrievalsOrders: RetrievalOrder[];
  showUserEmail?: boolean;
}

export default function HistoryList({ retrievalsOrders, showUserEmail = false }: HistoryListProps) {
  if (retrievalsOrders.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">No history found</p>
        <p className="text-gray-400 text-sm mt-2">Your retrievals and orders will appear here</p>
      </div>
    );
  }

  // Sort by date (most recent first)
  const sortedOrders = [...retrievalsOrders].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="space-y-4">
      {sortedOrders.map((order) => (
        <Card key={order.id} className="p-4 border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  order.type === 'retrieval' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-purple-100 text-purple-800'
                }`}>
                  {order.type === 'retrieval' ? 'Retrieval' : 'Order'}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  order.status === 'completed' 
                    ? 'bg-green-100 text-green-800' 
                    : order.status === 'approved'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>

              <h4 className="font-semibold text-gray-900 mb-2">{order.itemName}</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-gray-400" />
                  <span>Quantity: <span className="font-semibold text-gray-900">{order.quantity}</span></span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>{new Date(order.date).toLocaleDateString()}</span>
                </div>

                {showUserEmail && (
                  <div className="flex items-center gap-2 col-span-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <span className="truncate">{order.userEmail}</span>
                  </div>
                )}

                <div className="flex items-start gap-2 col-span-2">
                  <FileText className="w-4 h-4 text-gray-400 mt-0.5" />
                  <span className="flex-1">{order.notes}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
