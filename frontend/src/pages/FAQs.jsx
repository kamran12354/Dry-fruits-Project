import React, { useState } from "react";

// FAQs_React_Tailwind.jsx
// Single-file React component styled with Tailwind CSS.
// - Default export: FAQs component
// - Accessible accordion behavior
// - Search and category filter
// - Copy/paste into your React project (Vite / CRA). Ensure Tailwind is configured.

const FAQ_ITEMS = [
  {
    id: 1,
    question: "What types of dry fruits do you offer?",
    answer:
      "We offer premium-quality Almonds, Cashews, Pistachios, Walnuts, Raisins, Dates, Figs, Apricots, and mixed dry fruit gift packs.",
    category: "Products",
  },
  {
    id: 2,
    question: "Are your dry fruits roasted or raw?",
    answer: "We provide both options. You can choose raw, roasted, or salted varieties depending on the product.",
    category: "Products",
  },
  {
    id: 3,
    question: "Do you offer home delivery?",
    answer: "Yes! We offer fast and secure home delivery across Pakistan. Delivery time is usually 2–5 working days.",
    category: "Shipping",
  },
  {
    id: 4,
    question: "How are the dry fruits packed?",
    answer: "All products are packed in air-tight, food-grade premium packaging to maintain freshness and flavor.",
    category: "Shipping",
  },
  {
    id: 5,
    question: "Are the dry fruits organic?",
    answer: "Many of our items are organic or naturally sourced. Each product page clearly mentions whether it is organic or premium grade.",
    category: "Products",
  },
  {
    id: 6,
    question: "Can I return or replace a product?",
    answer: "Yes, if the product is damaged, expired, or not as ordered, you can request a replacement or refund within 48 hours of delivery.",
    category: "Returns",
  },
  {
    id: 7,
    question: "How can I place an order?",
    answer: "You can place an order directly through our website by adding items to your cart and completing the checkout process.",
    category: "Orders",
  },
  {
    id: 8,
    question: "What payment methods do you accept?",
    answer: "We accept Cash on Delivery (COD), online bank transfer, and digital wallet payments (if enabled).",
    category: "Orders",
  },
  {
    id: 9,
    question: "Do you offer discounts or bundle deals?",
    answer: "Yes! We regularly offer bundle packs, seasonal discounts, and special offers. Check the Deals section for updates.",
    category: "Offers",
  },
  {
    id: 10,
    question: "How can I contact customer support?",
    answer: "You can reach us via the Contact Us page, email support, or our WhatsApp customer helpline for quick responses.",
    category: "Support",
  },
];

export default function FAQs() {
  const [openId, setOpenId] = useState(null);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(FAQ_ITEMS.map((f) => f.category)))];

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  const filtered = FAQ_ITEMS.filter((f) => {
    const matchesQuery =
      f.question.toLowerCase().includes(query.toLowerCase()) ||
      f.answer.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === "All" || f.category === category;
    return matchesQuery && matchesCategory;
  });

  return (
    <section className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold">Frequently Asked Questions</h1>
        <p className="mt-2 text-sm text-gray-600">Answers to common questions about our dry fruits, orders, and delivery.</p>
      </header>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex-1">
          <label htmlFor="search" className="sr-only">Search FAQs</label>
          <div className="relative">
            <input
              id="search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions or answers..."
              className="w-full border border-gray-200 rounded-lg py-3 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-emerald-300"
            />
            <svg className="w-5 h-5 absolute right-3 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 16.65z" />
            </svg>
          </div>
        </div>

        <div className="w-48">
          <label htmlFor="category" className="sr-only">Filter by category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-200 rounded-lg py-3 px-3 focus:outline-none"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="p-6 text-center text-gray-500">No results found. Try a different keyword or category.</div>
        )}

        {filtered.map((item) => (
          <article key={item.id} className="border border-gray-100 rounded-xl">
            <button
              onClick={() => toggle(item.id)}
              aria-expanded={openId === item.id}
              aria-controls={`faq-${item.id}`}
              className="w-full text-left flex items-center justify-between p-4 md:p-5"
            >
              <div>
                <h3 className="text-lg font-medium">{item.question}</h3>
                <p className="text-xs text-gray-500 mt-1">Category: {item.category}</p>
              </div>

              <span className="ml-4 flex-shrink-0">
                <svg
                  className={`w-5 h-5 transform transition-transform ${openId === item.id ? "rotate-180" : "rotate-0"}`}
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>

            <div
              id={`faq-${item.id}`}
              role="region"
              aria-labelledby={`faq-${item.id}-title`}
              className={`${openId === item.id ? "block" : "hidden"} border-t border-gray-100 px-4 pb-4 md:px-5 md:pb-5 text-gray-700`}
            >
              <p className="pt-3">{item.answer}</p>
            </div>
          </article>
        ))}
      </div>

      <footer className="mt-8 text-sm text-gray-500">
        Didn’t find what you need? <a href="/contact" className="text-emerald-600 hover:underline">Contact our support</a> and we’ll be happy to help.
      </footer>
    </section>
  );
}
