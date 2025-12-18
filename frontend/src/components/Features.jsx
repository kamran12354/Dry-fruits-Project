import React from "react";

export default function Features() {
  const items = [
    { title: "Free Delivery", desc: "On orders over ₨ 15000", icon: "🚚", color: "bg-orange-100" },
    { title: "Fresh & Handpicked", desc: "Top quality dry fruits", icon: "🌰", color: "bg-yellow-100" },
    { title: "Secure Payment", desc: "Multiple payment options", icon: "🔒", color: "bg-green-100" },
    { title: "Easy Returns", desc: "2-day return policy", icon: "🔁", color: "bg-blue-100" },
  ];

  return (
    <section className="py-12 bg-gradient-to-r from-orange-50 to-yellow-50">
      <div className="container mx-auto px-4">
        
        <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">
          Why GB Dry Fruits?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((it, i) => (
            <div
              key={i}
              className={`${it.color} p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1`}
            >
              <div className="text-4xl mb-3">{it.icon}</div>
              <h3 className="font-semibold text-lg text-gray-800">{it.title}</h3>
              <p className="text-gray-600 text-sm mt-1">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
