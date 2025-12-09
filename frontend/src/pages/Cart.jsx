import React, { useEffect, useState } from "react";
import api from "../services/api";
import Recommended from "../components/Recommended";

import InvoiceModal from "../components/InvoiceModal";

// <-- added

export default function Cart() {
  const [items, setItems] = useState([]);
  const [showInvoice, setShowInvoice] = useState(false);


  const fetchCart = async () => {
    try {
      const res = await api.get("/cart");
      setItems(res.data || []);
    } catch (err) {
      console.error(err);
      setItems([]);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (productId, quantity) => {
    try {
      await api.put(`/cart/${productId}`, { productId, quantity });
      await fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const removeItem = async (productId) => {
    try {
      await api.delete("/cart", { data: { productId } });
      await fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const total = items.reduce(
    (s, it) => s + (it.product?.price || 0) * (it.quantity || 0),
    0
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {/* Cart Items */}
      <div className="space-y-4">
        {items.length === 0 && <p>Your cart is empty.</p>}
        {items.map(it => (
          <div key={it.product?._id} className="flex items-center gap-4 border p-3 rounded bg-white">
            <img
              src={it.product?.image || "https://via.placeholder.com/150"}
              alt={it.product?.name}
              className="w-24 h-24 object-cover rounded"
            />

            <div className="flex-1">
              <div className="font-semibold">{it.product?.name}</div>
              <div className="text-sm text-gray-600">₹{it.product?.price}</div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                min={0}
                value={it.quantity}
                onChange={(e) => updateQuantity(it.product._id, Number(e.target.value))}
                className="w-20 border rounded px-2 py-1"
              />
              <button
                onClick={() => removeItem(it.product._id)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total + Checkout */}
      <div className="mt-6 text-right">
        <div className="text-lg font-semibold">Total: ₹{total}</div>
        <button
          onClick={() => setShowInvoice(true)}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Checkout
        </button>
        <InvoiceModal
          isOpen={showInvoice}
          onClose={() => setShowInvoice(false)}
          items={items}
          total={total}
        />

      </div>

      {/* ⭐ Recommended Products Section After Cart */}
      <div className="mt-10">
        <Recommended />
      </div>
    </div>
  );
}
