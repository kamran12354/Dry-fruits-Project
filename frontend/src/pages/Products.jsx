import React, { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/products");
        // backend returns { products } in getAllProducts
        setProducts(res.data.products || res.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const addToCart = async (productId) => {
    try {
      await api.post("/cart", { productId });
      alert("Added to cart");
    } catch (err) {
      alert("Please login or try again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(p => <ProductCard key={p._id} product={p} onAdd={addToCart} />)}
      </div>
    </div>
  );
}
