import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import { useAuth } from "@clerk/clerk-react";
import DashboardPage from "../src/pages/DashboardPage";
import ProductPage from "../src/pages/ProductPage";
import OrdersPage from "../src/pages/OrdersPage";
import CustomersPage from "../src/pages/CustomersPage";
import DashboardLayout from "../src/layouts/DashboardLayout";
import PageLoader from './components/PageLoader';

function App (){
  const {isSignedIn, isLoaded } = useAuth();

  if(!isLoaded) return <PageLoader/>
  
  return (
    <Routes>
      <Route path="/login" element={isSignedIn ? <Navigate to={"/dashboard"}/> : <LoginPage />} />
      <Route path="/" element={isSignedIn ? <DashboardLayout/> : <Navigate to={"/login"}/>}>
        <Route index element={<Navigate to={"/dashboard"}/>}/>
        <Route path="dashboard" element={<DashboardPage/>}/>
        <Route path="products" element={<ProductPage/>}/>
        <Route path="orders" element={<OrdersPage/>}/>
        <Route path="customers" element={<CustomersPage/>}/>
      </Route>
    </Routes>
  )
}

export default App;
