'use client';

import { useState } from 'react';
import Login from '@/app/components/Login';
import LecturerDashboard from '@/app/components/LecturerDashboard';
import StaffDashboard from '@/app/components/StaffDashboard';
import { Toaster } from '@/app/components/ui/sonner';
import supabase from './lib/client';


export interface User {
  email: string;
  role: 'lecturer' | 'staff';
}

export interface StationeryItem {
  id: string;
  name: string;
  category: 'OP Stock' | 'OP Non-Stock';
  totalStock: number;
  availableStock: number;
  unit: string;
}

export interface RetrievalOrder {
  id: string;
  type: 'retrieval' | 'order';
  userEmail: string;
  itemId: string;
  itemName: string;
  quantity: number;
  notes: string;
  date: string;
  status: 'pending' | 'approved' | 'completed';
}

export interface MissingReport {
  id: string;
  itemId: string;
  itemName: string;
  reportedBy: string;
  quantity: number;
  notes: string;
  date: string;
}


const fetchStationery = async () => {
  const { data, error } = await supabase
    .from('stationery_items')
    .select(`
      id,
      name,
      category,
      total_stock,
      available_stock,
      unit
    `)
    .order('name');

  if (error) throw error;

  return data.map(item => ({
    id: item.id,
    name: item.name,
    category: item.category,
    totalStock: item.total_stock,
    availableStock: item.available_stock,
    unit: item.unit,
  }));
};


const handleLogin = async (email: string) => {
  const { data, error } = await supabase
    .from('users')
    .select('email, role')
    .eq('email', email)
    .single();

  if (error) throw error;

  setUser(data);
};


const handleAddRetrievalOrder = async (
  order: Omit<RetrievalOrder, 'id' | 'date' | 'status'>
) => {
  const { error } = await supabase
    .from('retrieval_orders')
    .insert({
      id: crypto.randomUUID(),
      type: order.type,
      user_email: order.userEmail,
      item_id: order.itemId,
      item_name: order.itemName,
      quantity: order.quantity,
      notes: order.notes,
    });

  if (error) throw error;

  // refresh data
  fetchOrders();
  fetchStationery();
};


const fetchOrders = async () => {
  const { data, error } = await supabase
    .from('retrieval_orders')
    .select('*')
    .order('date', { ascending: false });

  if (error) throw error;

  setRetrievalsOrders(
    data.map(o => ({
      id: o.id,
      type: o.type,
      userEmail: o.user_email,
      itemId: o.item_id,
      itemName: o.item_name,
      quantity: o.quantity,
      notes: o.notes,
      date: o.date,
      status: o.status,
    }))
  );
};


const handleAddMissingReport = async (
  report: Omit<MissingReport, 'id' | 'date'>
) => {
  const { error } = await supabase
    .from('missing_reports')
    .insert({
      id: crypto.randomUUID(),
      item_id: report.itemId,
      item_name: report.itemName,
      reported_by: report.reportedBy,
      quantity: report.quantity,
      notes: report.notes,
    });

  if (error) throw error;

  fetchMissingReports();
};

const handleUpdateStock = async (itemId: string, newStock: number) => {
  const { error } = await supabase
    .from('stationery_items')
    .update({ available_stock: newStock })
    .eq('id', itemId);

  if (error) throw error;

  fetchStationery();
};


function App() {
  
  const [user, setUser] = useState<User | null>(null);
  
  // Initialize with sample data
  const [stationeryItems, setStationeryItems] = useState<StationeryItem[]>([
    { id: '1', name: 'A4 Paper (Ream)', category: 'OP Stock', totalStock: 100, availableStock: 75, unit: 'reams' },
    { id: '2', name: 'Ballpoint Pen (Blue)', category: 'OP Stock', totalStock: 500, availableStock: 320, unit: 'pcs' },
    { id: '3', name: 'Whiteboard Marker', category: 'OP Stock', totalStock: 200, availableStock: 145, unit: 'pcs' },
    { id: '4', name: 'Stapler', category: 'OP Non-Stock', totalStock: 50, availableStock: 28, unit: 'pcs' },
    { id: '5', name: 'Scissors', category: 'OP Non-Stock', totalStock: 40, availableStock: 22, unit: 'pcs' },
    { id: '6', name: 'File Folder', category: 'OP Stock', totalStock: 300, availableStock: 156, unit: 'pcs' },
    { id: '7', name: 'Correction Tape', category: 'OP Stock', totalStock: 150, availableStock: 89, unit: 'pcs' },
    { id: '8', name: 'Calculator', category: 'OP Non-Stock', totalStock: 30, availableStock: 12, unit: 'pcs' },
  ]);

  const [retrievalsOrders, setRetrievalsOrders] = useState<RetrievalOrder[]>([
    {
      id: '1',
      type: 'retrieval',
      userEmail: 'lecturer123@university.edu',
      itemId: '1',
      itemName: 'A4 Paper (Ream)',
      quantity: 5,
      notes: 'For class handouts',
      date: new Date().toISOString(),
      status: 'completed'
    },
  ]);

  const [missingReports, setMissingReports] = useState<MissingReport[]>([]);

  const handleLogin = (userData: User) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleAddRetrievalOrder = (order: Omit<RetrievalOrder, 'id' | 'date' | 'status'>) => {
    const newOrder: RetrievalOrder = {
      ...order,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      status: 'pending'
    };
    
    setRetrievalsOrders([...retrievalsOrders, newOrder]);
    
    // Update stock if retrieval
    if (order.type === 'retrieval') {
      setStationeryItems(items =>
        items.map(item =>
          item.id === order.itemId
            ? { ...item, availableStock: item.availableStock - order.quantity }
            : item
        )
      );
    }
  };

  const handleAddMissingReport = (report: Omit<MissingReport, 'id' | 'date'>) => {
    const newReport: MissingReport = {
      ...report,
      id: Date.now().toString(),
      date: new Date().toISOString()
    };
    
    setMissingReports([...missingReports, newReport]);
  };

  const handleUpdateStock = (itemId: string, newStock: number) => {
    setStationeryItems(items =>
      items.map(item =>
        item.id === itemId
          ? { ...item, availableStock: newStock }
          : item
      )
    );
  };

  if (!user) {
    return (
      <>
        <Login onLogin={handleLogin} />
        <Toaster />
      </>
    );
  }

  return (
    <>
      {user.role === 'lecturer' ? (
        <LecturerDashboard
          user={user}
          onLogout={handleLogout}
          stationeryItems={stationeryItems}
          userRetrievalsOrders={retrievalsOrders.filter(r => r.userEmail === user.email)}
          onAddRetrievalOrder={handleAddRetrievalOrder}
        />
      ) : (
        <StaffDashboard
          user={user}
          onLogout={handleLogout}
          stationeryItems={stationeryItems}
          retrievalsOrders={retrievalsOrders}
          missingReports={missingReports}
          onAddMissingReport={handleAddMissingReport}
          onUpdateStock={handleUpdateStock}
        />
      )}
      <Toaster />
    </>
  );
}

export default App;
