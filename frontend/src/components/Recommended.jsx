import React, { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "./ProductCard";

export default function Recommended() {
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        const res = await api.get("/products/recommendations"); // FIXED URL
        setRecommended(res.data); // because backend returns an array
      } catch (err) {
        console.error("Recommended fetch error:", err);
        setRecommended([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommended();
  }, []);

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-4">Recommended</h2>

        {loading ? (
          <p>Loading...</p>
        ) : recommended.length === 0 ? (
          <p>No recommended products</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {recommended.map((p) => (
              <ProductCard key={p._id} product={p} onAdd={() => {}} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
