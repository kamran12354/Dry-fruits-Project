import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/products");
        const items = res.data.products || res.data;
        const found = items.find(p => p._id === id);
        setProduct(found || null);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [id]);

  const addToCart = async () => {
    try {
      await api.post("/cart", { productId: id });
      alert("Added to cart");
    } catch (err) {
      alert("Please login or try again.");
    }
  };

  if (!product) return <div className="container mx-auto px-4 py-8">Product not found.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <img src={product.image || "https://via.placeholder.com/600"} alt={product.name} className="w-full h-96 object-cover rounded" />
        </div>
        <div className="md:col-span-2">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-gray-700 mt-2">{product.description}</p>
          <div className="mt-4 flex items-center gap-4">
            <span className="text-xl font-semibold">₹{product.price}</span>
            <button onClick={addToCart} className="px-4 py-2 bg-green-600 text-white rounded">Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
