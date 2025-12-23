// src/App.jsx
import ProductManagement from "./pages/ProductManagement";
import "./index.css"; // MUST be here
import { Routes, Route } from "react-router-dom";
import Shop from "./pages/Shop";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ProductManagement />} />
      <Route path="/shop" element={<Shop />} />
    </Routes>
  );
}

