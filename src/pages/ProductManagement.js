import { useEffect, useState } from "react";
import { getProducts } from "../api/product.service";
import ProductTable from "../components/Table";
import AddProductModal from "../components/AddProductModal";

const ITEMS_PER_PAGE = 8;

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [openAddModal, setOpenAddModal] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await getProducts();
      setProducts(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = products.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <h1 className="text-xl font-semibold">Product Management</h1>
          <button
            onClick={() => setOpenAddModal(true)}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
          >
            + Add Product
          </button>
        </div>

        {loading ? (
          <p className="p-4">Loading...</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <ProductTable
                currentProducts={currentProducts}
                fetchProducts={fetchProducts}
              />
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between p-4 border-t">
              <p className="text-sm text-gray-600">
                Page {currentPage} of {totalPages}
              </p>
              <div className="flex gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="px-3 py-1 rounded border text-sm disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="px-3 py-1 rounded border text-sm disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Add Product Modal */}
      {openAddModal && (
        <AddProductModal
          onClose={() => setOpenAddModal(false)}
          onSuccess={fetchProducts}
        />
      )}
    </div>
  );
}
