export default function ProductCard({ product }) {
  return (
    <div className="border rounded-lg shadow-sm hover:shadow-md transition">
      <img
        src={product.image}
        alt={product.title}
        className="h-48 w-full object-contain p-4"
      />

      <div className="p-4">
        <h3 className="font-semibold truncate" title={product.title}>
          {product.title}
        </h3>

        <p className="text-gray-600 text-sm mt-1">
          ${product.price}
        </p>

        <button className="mt-3 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
