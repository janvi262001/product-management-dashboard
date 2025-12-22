import React, { useEffect, useState } from "react";

const ProductForm = ({ addProduct, editProduct, updateProduct }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (editProduct) {
      setName(editProduct.name);
      setPrice(editProduct.price);
    }
  }, [editProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !price) return alert("Fill all fields");

    if (editProduct) {
      updateProduct({ ...editProduct, name, price });
    } else {
      addProduct({ name, price });
    }

    setName("");
    setPrice("");
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <button type="submit">
        {editProduct ? "Update" : "Add"}
      </button>
    </form>
  );
};

export default ProductForm;
