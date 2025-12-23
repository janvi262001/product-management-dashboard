import { useState } from "react";
import { deleteProduct } from "../api/product.service";
import ConfirmModal from "./ConfirmModal";

export default function Table({ currentProducts, handleEditProduct,setProducts,products}) {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleDeleteClick = (id) => {
    setSelectedProductId(id);
    setOpenConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedProductId !== null) {
      await deleteProduct(selectedProductId);
      setProducts(products.filter(product => product.id !== selectedProductId));
      // fetchProducts();
      setOpenConfirm(false);
      setSelectedProductId(null);
    }
  };

  return (
    <>
      <table className="min-w-full border-collapse">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 w-16">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 w-96">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 w-16">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 w-32">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {currentProducts.length === 0 ? (
            <tr>
              <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                No products found
              </td>
            </tr>
          ) : (
            currentProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm">{product.id}</td>
                <td className="px-6 py-4 text-sm">{product.title}</td>
                <td className="px-6 py-4 text-sm">{product.price}</td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="px-3 py-1 rounded-md text-sm bg-indigo-500 text-white hover:bg-indigo-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(product.id)}
                      className="px-3 py-1 rounded-md text-sm bg-red-500 text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this product?"
      />
    </>
  );
}
