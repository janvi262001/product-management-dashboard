// src/api/product.service.js
import axiosInstance from "./axiosInstance";

// GET all products
export const getProducts = () => {
  return axiosInstance.get("/products");
};

// GET single product
export const getProductById = (id) => {
  return axiosInstance.get(`/products/${id}`);
};

// CREATE product
export const createProduct = (payload) => {
  return axiosInstance.post("/products", payload);
};

// UPDATE product
export const updateProduct = (id, payload) => {
  return axiosInstance.put(`/products/${id}`, payload);
};

// DELETE product
export const deleteProduct = (id) => {
  return axiosInstance.delete(`/products/${id}`);
};
