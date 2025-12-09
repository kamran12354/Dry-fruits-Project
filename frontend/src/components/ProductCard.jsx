import React from "react";
import { Link } from "react-router-dom";

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="border rounded-lg p-3 flex flex-col">
      <img src={product.image || "https://via.placeholder.com/400"} alt={product.name} className="h-40 w-full object-cover rounded mb-3" />
      <h3 className="font-semibold">{product.name}</h3>
      <p className="text-sm text-gray-600 flex-1">{product.description?.slice(0, 80)}</p>
      <div className="mt-3 flex items-center justify-between">
        <strong>₹{product.price}</strong>
        <div className="flex items-center gap-2">
          <Link to={`/product/${product._id}`} className="text-sm underline">Details</Link>
          <button onClick={() => onAdd(product._id)} className="px-2 py-1 bg-green-600 text-white rounded text-sm">Add</button>
        </div>
      </div>
    </div>
  );
}
