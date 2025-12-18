import React from "react";

export default function PrivacyPolicy() {
  return (
    <section className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold">Privacy Policy</h1>
        <p className="mt-2 text-sm text-gray-600">
          We care about your privacy and protect your personal information.
        </p>
      </header>

      <div className="space-y-5 text-gray-700">
        <div>
          <h2 className="text-xl font-semibold mb-1">1. Information We Collect</h2>
          <ul className="list-disc ml-6 text-sm space-y-1">
            <li>Name and contact details</li>
            <li>Delivery address</li>
            <li>Order information</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-1">2. How We Use Your Information</h2>
          <ul className="list-disc ml-6 text-sm space-y-1">
            <li>To deliver your orders</li>
            <li>To contact you about your order</li>
            <li>To improve our services</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-1">3. Data Security</h2>
          <p className="text-sm">
            We use safe methods to protect your personal data.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-1">4. Sharing Information</h2>
          <p className="text-sm">
            We do not sell your data. We only share it with delivery or payment services if needed.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-1">5. Cookies</h2>
          <p className="text-sm">
            Cookies help improve your browsing experience. You can disable them anytime.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-1">6. Your Rights</h2>
          <ul className="list-disc ml-6 text-sm space-y-1">
            <li>Update your information</li>
            <li>Request data removal</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-1">7. Contact Us</h2>
          <p className="text-sm">
            Email: <span className="text-emerald-600">support@dryfruitstore.com</span>
          </p>
        </div>
      </div>

      <footer className="mt-6 text-sm text-gray-500">
        Your trust matters to us.
      </footer>
    </section>
  );
}
