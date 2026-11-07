import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";

import AppProvider from "./context/AppProvider";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { initializeDefaultUsers } from "./app/redux/api/users";

import Navbar from "./components/common/Navbar";
import Sidebar from "./components/common/Sidebar";
import Toast from "./components/common/Toast";

import Dashboard from "./pages/Dashboard";
import Crops from "./pages/Crops";
import HarvestOrders from "./pages/HarvestOrders";
import Buyers from "./pages/Buyers";
import Workers from "./pages/Workers";
import Equipment from "./pages/Equipment";
import Tasks from "./pages/Tasks";
import Expenses from "./pages/Expenses";
import Maintenance from "./pages/Maintenance";
import Reports from "./pages/Reports";
import Inventory from "./pages/Inventory";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

function AppLayout() {
  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-area">
        <Navbar />

        <main className="page-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/crops" element={<Crops />} />
            <Route path="/harvest-orders" element={<HarvestOrders />} />
            <Route path="/buyers" element={<Buyers />} />
            <Route path="/workers" element={<Workers />} />
            <Route path="/equipment" element={<Equipment />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </main>

        
        <Toast />
      </div>
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/*" element={<AppLayout />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  useEffect(() => {
    initializeDefaultUsers();
  }, []);

  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  );
}