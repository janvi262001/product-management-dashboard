import { useEffect, useState, useMemo } from "react";
import { getProducts } from "../api/product.service";
import ProductCard from "../components/ProductCard";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then(res => setProducts(res))
      .finally(() => setLoading(false));
  }, []);

  // 🔍 Filter products by title or category
  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return products;

    const term = searchTerm.toLowerCase();

    return products.filter(
      product =>
        product.title.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term)
    );
  }, [products, searchTerm]);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
        <div>
            
        </div>
      <h1 className="text-2xl font-bold mb-4">Shop</h1>

      {/* 🔍 Search Bar */}
      <div className="mb-6 max-w-md">
        <input
          type="text"
          placeholder="Search by title or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-indigo-200"
        />
      </div>

      {/* 🧾 Products Grid */}
      {filteredProducts.length === 0 ? (
        <p className="text-gray-500">No products found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
