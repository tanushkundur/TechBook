import { Routes, Route } from "react-router-dom";
import { CartPage, HomePage,Login,ProductList, Register } from "../pages";  
import { ProductDetail } from "../pages/ProductDetails";
import { ProtectedRoute } from "./ProtectedRoute";
import { Dashboard } from "../pages/Dashborad/DashboardPage";
export const AllRoutes = () => {
  return (
    <>
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="products" element={<ProductList />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="cart" element={<CartPage />} />

    </Routes>
    </>
  )
}
