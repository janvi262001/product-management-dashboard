import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createProduct,updateProduct } from "../api/product.service";
import { useEffect, useState } from "react";

const ProductSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  price: Yup.number()
    .typeError("Price must be a number")
    .positive("Price must be positive")
    .required("Price is required"),
  description: Yup.string().required("Description is required"),
  category: Yup.string().required("Category is required"),
  image: Yup.string()
    .url("Must be a valid URL")
    .required("Image URL is required"),
});

export default function AddProductModal({ onClose, onSuccess, editProduct, setProducts,products }) {
  console.log("editProduct",editProduct);
  const [initialValues, setInitialValues] = useState({
            id: null,
            title: "",
            price: "",
            description: "",
            category: "",
            image: "",
          });

  useEffect(() => {
    if (editProduct) {
      setInitialValues(editProduct);
    }
  },[editProduct]);     
  
  const addOrEditProduct = async (values,setSubmitting) => {
    try {
      if(values?.id){
        const result=await updateProduct(values.id, values);
        setProducts(prev =>
        prev.map(product =>
          product.id === values.id ? result : product
        )
      );
      }else{
        const result = await createProduct(values);
        setProducts(prev => [...prev, result]);
      }
      console.log("closing modal");
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Add New Product</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            ✕
          </button>
        </div>

        {/* Form */}
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={ProductSchema}
          onSubmit={(values, { setSubmitting }) =>addOrEditProduct(values, setSubmitting)}
        >
          {({values, isSubmitting }) => (
            <Form className="p-4 space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <Field
                  name="title"
                  className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-indigo-200"
                />
                <ErrorMessage
                  name="title"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium mb-1">Price</label>
                <Field
                  name="price"
                  className="w-full border rounded-lg px-3 py-2"
                />
                <ErrorMessage
                  name="price"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Category
                </label>
                <Field
                  name="category"
                  className="w-full border rounded-lg px-3 py-2"
                />
                <ErrorMessage
                  name="category"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Image */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Image URL
                </label>
                <Field
                  name="image"
                  className="w-full border rounded-lg px-3 py-2"
                />
                <ErrorMessage
                  name="image"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <Field
                  as="textarea"
                  rows="3"
                  name="description"
                  className="w-full border rounded-lg px-3 py-2"
                />
                <ErrorMessage
                  name="description"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg border"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
                >
                  {isSubmitting ? "Saving..." : 
                  (values?.id ? "Update Product" : "Add Product")}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
