// src/App.jsx
import ProductManagement from "./pages/ProductManagement";
import "./index.css"; // MUST be here
import Modal from "react-modal";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <ProductManagement />
    </div>
  );
}
