import React from "react";

export default function ReturnsPage() {
  return (
    <section className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md leading-relaxed">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold">Return & Replacement Policy</h1>
        <p className="mt-2 text-gray-600 text-sm">
          Our goal is to ensure you receive fresh and high‑quality dry fruits. If something isn't right, we are here to help.
        </p>
      </header>

      <div className="space-y-6 text-gray-700">
        <div>
          <h2 className="text-xl font-semibold mb-2">1. Eligibility for Return</h2>
          <p>
            You can request a replacement or refund if you receive:
          </p>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Damaged or torn packaging</li>
            <li>Expired product</li>
            <li>Wrong item or quantity</li>
            <li>Product not matching the description</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">2. Time Limit</h2>
          <p>
            Returns must be reported within <strong>48 hours</strong> of receiving your order.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">3. Items Not Eligible for Return</h2>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Opened or consumed products</li>
            <li>Products damaged after delivery</li>
            <li>Items purchased under clearance or special deals (unless damaged)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">4. How to Request a Return</h2>
          <p>Follow these simple steps:</p>
          <ol className="list-decimal ml-6 mt-2 space-y-1">
            <li>Take clear photos/videos of the product and packaging.</li>
            <li>Send them to our customer support through WhatsApp or email.</li>
            <li>Include your order number and issue details.</li>
          </ol>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">5. Refund / Replacement Process</h2>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>After reviewing your claim, we will approve or reject the request.</li>
            <li>Approved refunds are processed within 3–5 working days.</li>
            <li>Replacements are shipped immediately depending on stock availability.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">6. Contact Support</h2>
          <p>
            If you need help with your return, feel free to contact us:
          </p>
          <p className="mt-1">
            Email: <span className="text-emerald-600">support@dryfruitstore.com</span>
          </p>
          <p>
            WhatsApp: <span className="text-emerald-600">+92-300-XXXXXXX</span>
          </p>
        </div>
      </div>

      <footer className="mt-8 text-sm text-gray-500">
        Customer satisfaction is our top priority — we’re always here to help you.
      </footer>
    </section>
  );
}